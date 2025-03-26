import google.generativeai as genai
import streamlit as st

# Configure the Gemini API with your API key
genai.configure(api_key="AIzaSyCyuEqAYde3rqzgqyNI5aZYhKXUx2bBSaE")

# Set up the generation configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 0,
    "max_output_tokens": 8192,
}

# Safety settings to prevent harmful content
safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_NONE"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_NONE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_NONE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_NONE"
    },
]

# System instruction to guide the chatbot's behavior
system_instruction = "You are an expert in healthcare support, specializing in providing accurate and reliable information on medical conditions, treatments, and wellness. You assist users with symptom assessment, medication guidance, appointment scheduling, and general health education. Your goal is to offer helpful, evidence-based advice while ensuring compliance with privacy and data protection standards."

# Initialize the GenerativeModel with the specified parameters
model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                              generation_config=generation_config,
                              system_instruction=system_instruction,
                              safety_settings=safety_settings)

# Initialize the conversation history
convo = model.start_chat(history=[])

# Streamlit UI

st.title("MED BOT")

# Initialize the chat history
if "chat_history" not in st.session_state:
    st.session_state.chat_history = []

# Display the conversation
for message in st.session_state.chat_history:
    if message["role"] == "user":
        st.write(f"**You:** {message['text']}")
    else:
        st.write(f"**AUTHOR:** {message['text']}")

# Text input for the user's message
user_input = st.text_input("Ask your queries to get cleared:")

if user_input:
    # Send user input to the chatbot
    st.session_state.chat_history.append({"role": "user", "text": user_input})
    convo.send_message(user_input)
    response = convo.last.text

    # Display the chatbot's response
    st.session_state.chat_history.append({"role": "bot", "text": response})
    st.write(f"**author:** {response}")

# Button to clear the chat history
if st.button("Clear Chat"):
    st.session_state.chat_history = []
