class RoadmapService:

    @staticmethod
    def generate_roadmap(data):
        roadmap = []

        languages = data.get("top_languages", {})
        total_repos = data.get("public_repos", 0)

        # 🔥 No data case
        if not languages:
            return [
                "Start with Python or JavaScript",
                "Learn basic programming",
                "Build 2-3 beginner projects"
            ]

        # 🔥 Based on top language
        top_lang = max(languages, key=languages.get)

        if top_lang == "Python":
            roadmap.extend([
                "Learn Data Structures & Algorithms",
                "Explore Django / FastAPI",
                "Build backend projects",
                "Try Machine Learning basics"
            ])

        elif top_lang == "JavaScript":
            roadmap.extend([
                "Master React.js",
                "Learn Node.js & Express",
                "Build full-stack apps",
                "Explore Next.js"
            ])

        elif top_lang == "C":
            roadmap.extend([
                "Learn C++ or Java",
                "Practice DSA",
                "Start competitive programming",
                "Build small system projects"
            ])

        else:
            roadmap.append(f"Improve your skills in {top_lang}")

        # 🔥 Repo-based suggestions
        if total_repos < 5:
            roadmap.append("Build at least 5 strong projects")
        elif total_repos < 15:
            roadmap.append("Improve project quality & add advanced features")
        else:
            roadmap.append("Focus on real-world scalable applications")

        return roadmap