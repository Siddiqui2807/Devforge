class ResumeService:

    @staticmethod
    def generate_resume(data):
        resume = {}

        resume["name"] = data.get("username")
        resume["skills"] = list(data.get("top_languages", {}).keys())

        # Projects
        projects = []
        for repo in data.get("repos", []):
            projects.append({
                "title": repo["name"],
                "description": f"A project with {repo['stars']} stars",
                "link": repo["url"]
            })

        resume["projects"] = projects

        # Summary
        if resume["skills"]:
            top_skill = resume["skills"][0]
            resume["summary"] = f"Developer skilled in {top_skill} with hands-on project experience."
        else:
            resume["summary"] = "Aspiring developer building projects."

        return resume