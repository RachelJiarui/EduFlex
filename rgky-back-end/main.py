import os
from fastapi import FastAPI
from youtube_transcript_api import YouTubeTranscriptApi
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
import gensim.downloader as api
from dotenv import load_dotenv
from pydantic import BaseModel
from typing import List


load_dotenv()



app = FastAPI()

class TranscriptItem(BaseModel):
    Text: str
    Time: List[float]

class ImplementationMappingRequest(BaseModel):
    implementationText: str 
    transcript: List[TranscriptItem]

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
glove_model = api.load("glove-wiki-gigaword-300")

# Allow all origins (for development purposes; specify your frontend URL in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/get-youtube-transcript-string/{video_id}")  # Corrected path parameter syntax
async def get_transcript_string(video_id: str):  # Renamed function for clarity
    transcript_data = YouTubeTranscriptApi.get_transcript(video_id)
    transcript = " ".join(item['text'] for item in transcript_data).replace('\n', ' ').replace('\r', ' ')
    return {"Transcript": transcript}

@app.get("/get-youtube-transcript-with-timestamp/{video_id}")  # Corrected path parameter syntax
async def get_transcript_with_timestamp(video_id: str):  # Renamed function for clarity
    transcript_data_formatted = []
    transcript_data = YouTubeTranscriptApi.get_transcript(video_id)
    for item in transcript_data:      
        item['text'] = item['text'].replace('\n', ' ')
        transcript_data_formatted.append(
            {
                "Text": item['text'],
                "Time": [item['start'], item['start'] + item['duration']]
            }
        )
    return transcript_data_formatted

@app.get("/get-openai-implementation/{user_input}")
async def hello(user_input):
    input_str = """Format using markdown. An example is as follows: 
                   
                   #Programming with Data:
                   This is some text that is under this headings 
                   
                   END EXAMPLE
                   
                   Now here is your input: """ + user_input
    resp = client.chat.completions.create(model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system", "content": "Given a project idea, return a numbered list with a relavant title in markdown separated by newlines on how one might implement the project. ONLY INCLUDE THE LIST, no extra text"
            },
            {
                "role": "user", "content": input_str  
            }
        ]).choices[0].message
    return resp.content 


THRESHOLD = 0.8  # Adjust as needed
stop_words = set(stopwords.words('english'))
porter = PorterStemmer()

def clean_and_tokenize(text):
    tokens = word_tokenize(text.lower())
    cleaned_tokens = [porter.stem(token) for token in tokens if token.isalnum() and token not in stop_words]
    return cleaned_tokens

@app.post('/implementation_mappings/')
async def implementation_mappings(req_body: ImplementationMappingRequest):
    print("Got here!")
    result = []
    print("Did you get here?")
    for text_dict in req_body.transcript:
        text = text_dict.Text
        time = text_dict.Time
        text_tokens = clean_and_tokenize(text)
        bps = req_body.implementationText.split("\n")
        
        for bp in bps:
            bp_tokens = clean_and_tokenize(bp)
            for bp_token in bp_tokens:
                for text_token in text_tokens:
                    if text_token in glove_model.key_to_index and bp_token in glove_model.key_to_index:
                        similarity = glove_model.similarity(bp_token, text_token)
                    else:
                        similarity = 0
                    if similarity > THRESHOLD:
                        result.append((bp, time))
                        break

    print(result)
    return result
