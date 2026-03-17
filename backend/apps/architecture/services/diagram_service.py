class DiagramService:

    def generate_architecture(self, project):

        tech_stack = project.get("technologies", [])

        frontend = None
        backend = None
        database = None

        for tech in tech_stack:

            tech_lower = tech.lower()

            if tech_lower in ["react", "vue", "angular"]:
                frontend = tech

            if tech_lower in ["django", "node", "flask"]:
                backend = tech

            if tech_lower in ["postgresql", "mysql", "mongodb"]:
                database = tech

        # Default stack if not detected
        if not frontend:
            frontend = "Frontend App"

        if not backend:
            backend = "Backend API"

        if not database:
            database = "Database"

        diagram = f"""
graph TD
A[{frontend}] --> B[{backend}]
B --> C[{database}]
"""

        return diagram