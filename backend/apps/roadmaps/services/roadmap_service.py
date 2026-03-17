class RoadmapService:

    def generate_roadmap(self, project):

        technologies = project.get("technologies", [])

        steps = []

        # Step 1
        steps.append({
            "step": 1,
            "title": "Project Setup",
            "description": "Initialize the project repository and setup the development environment."
        })

        # Step 2
        steps.append({
            "step": 2,
            "title": "Design System Architecture",
            "description": "Define frontend, backend, and database architecture."
        })

        # Technology specific steps
        if "django" in [t.lower() for t in technologies]:

            steps.append({
                "step": 3,
                "title": "Build Backend API",
                "description": "Create Django models, serializers, and REST APIs."
            })

        if "react" in [t.lower() for t in technologies]:

            steps.append({
                "step": 4,
                "title": "Develop Frontend",
                "description": "Build user interface using React and integrate APIs."
            })

        if "machine learning" in [t.lower() for t in technologies] or "nlp" in [t.lower() for t in technologies]:

            steps.append({
                "step": 5,
                "title": "Integrate AI Model",
                "description": "Develop and integrate machine learning model."
            })

        # Final step
        steps.append({
            "step": 6,
            "title": "Testing and Deployment",
            "description": "Test the application and deploy to production."
        })

        return steps