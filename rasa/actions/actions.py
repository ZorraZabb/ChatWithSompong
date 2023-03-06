# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List
#
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
#
#
# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []

class ActionFilterCurseWords(Action):
    def name(self) -> Text:
        return "action_filter_curse_words"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        # List of curse words
        curse_words = ["fuck", "shit", "bitch"]
        
        # Get the latest user message
        latest_message = tracker.latest_message.get('text', '').lower()
        
        # Check if any curse words are in the latest message
        if any(word in latest_message for word in curse_words):
            # Warn the user
            dispatcher.utter_message(text="Please refrain from using offensive language.")
        
        return []

