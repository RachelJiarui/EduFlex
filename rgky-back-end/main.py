from fastapi import FastAPI
from youtube_transcript_api import YouTubeTranscriptApi
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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
