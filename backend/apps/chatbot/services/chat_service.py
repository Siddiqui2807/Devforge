from __future__ import annotations


def _normalize_message(message):
    return str(message or "").strip()


def _contains_any(text, keywords):
    return any(keyword in text for keyword in keywords)


def get_chatbot_reply(message):
    cleaned_message = _normalize_message(message)
    lowered = cleaned_message.lower()

    if not cleaned_message:
        return "Please share your question, and I will help you with the next best step."

    if _contains_any(lowered, ["roadmap", "learning path", "plan"]):
        return (
            "For stronger roadmap results, start with one clear skill (for example: Django, React, or Data Science), "
            "define your current level, then generate and review the staged plan from Beginner to Advanced. "
            "If you want, I can help you break that roadmap into a weekly schedule."
        )

    if _contains_any(lowered, ["project", "portfolio", "build idea", "app idea"]):
        return (
            "A good project should map to your target skill and include real-world constraints. "
            "Try: 1) an MVP feature set, 2) authentication and API integration, 3) deployment, and 4) monitoring. "
            "I can suggest project ideas based on your skill stack."
        )

    if _contains_any(lowered, ["bug", "error", "exception", "crash", "debug"]):
        return (
            "Use this debugging flow: reproduce reliably, isolate the failing layer (UI/API/DB), inspect logs and request payloads, "
            "then validate with a focused fix. Share the exact error text and I can help you narrow root cause quickly."
        )

    if _contains_any(lowered, ["hello", "hi", "hey"]):
        return (
            "Hello. I can help with roadmap planning, project recommendations, and debugging guidance inside DevForge."
        )

    return (
        "I can assist with roadmap planning, project ideas, and debugging support. "
        "Tell me your current goal and stack, and I will suggest a practical next step."
    )

