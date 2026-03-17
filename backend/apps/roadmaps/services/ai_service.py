class AIService:

    @staticmethod
    def generate_insights(data):
        insights = []

        languages = data.get("top_languages", {})
        total_repos = data.get("public_repos", 0)

        if not languages:
            insights.append("No major languages detected. Start building projects.")
            return insights

        # Top language
        top_lang = max(languages, key=languages.get)
        insights.append(f"You are strong in {top_lang}.")

        # Repo count
        if total_repos < 5:
            insights.append("Build more projects to strengthen your profile.")
        elif total_repos < 15:
            insights.append("Good progress, keep building more projects.")
        else:
            insights.append("Great project count! Focus on quality now.")

        # Language diversity
        if len(languages) == 1:
            insights.append("Try learning new technologies to diversify your skills.")
        else:
            insights.append("You have a diverse tech stack.")

        return insights