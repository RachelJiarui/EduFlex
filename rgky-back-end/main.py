from fastapi import FastAPI
from youtube_transcript_api import YouTubeTranscriptApi
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI

app = FastAPI()
client = OpenAI()

# Allow all origins (for development purposes; specify your frontend URL in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/get-youtube-transcript-string/<video_id>")
async def hello(video_id):
    transcript_data = YouTubeTranscriptApi.get_transcript(video_id)
    transcript = " ".join(item['text'] for item in transcript_data).replace('\n', ' ').replace('\r', ' ')
    return {"Transcript": transcript}


@app.get("/get-youtube-transcript-with-timestamp/<video_id>")
async def hello(video_id):
    transcript_data_formatted = []
    transcript_data = YouTubeTranscriptApi.get_transcript(video_id)
    for stamp in transcript_data:      
        new_string = str(stamp['text']).replace('\n', ' ')
        stamp['text'] = new_string
    for stamp in transcript_data:
        transcript_data_formatted.append(
            {
                "Text": stamp['text'],
                "Time": [stamp['start'], stamp['start'] + stamp['duration']]
            }
        )
    return transcript_data_formatted

@app.get("/get-openai-implementation/<user_input>")
async def hello(user_input):
    resp = client.chat.completions.create(model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system", "content": "Given a project idea, return a bullet point list separated by newlines on how one might implement the project."
            },
            {
                "role": "user", "content": user_input
            }
        ]).choices[0].message
    return resp

