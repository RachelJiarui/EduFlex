from youtube_transcript_api import YouTubeTranscriptApi

video_id = "Unzc731iCUY"
transcript_data = YouTubeTranscriptApi.get_transcript(video_id)
transcript = " ".join(item['text'] for item in transcript_data).replace('\n', ' ').replace('\r', ' ')
print(transcript)
