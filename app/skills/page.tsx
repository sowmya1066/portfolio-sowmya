const skills = [
  { name: "JavaScript", level: 90 },
  { name: "React", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "Python", level: 75 },
  { name: "Three.js", level: 70 },
  { name: "GraphQL", level: 65 },
]

export default function Skills() {
  return (
    <div className="min-h-screen pt-20 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 gradient-text">My Skills</h1>
        <div className="grid gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="bg-card rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">{skill.name}</h3>
                <span className="text-lg font-semibold">{skill.level}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-4 rounded-full"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

