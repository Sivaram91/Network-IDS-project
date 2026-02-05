# How-To Guides

This page contains step-by-step guides for common tasks and procedures in the project.

_Last updated: {{ git_revision_date_localized }}_

-----

[TOC]


## How to Create Component Diagrams with PlantUML

**Overview:** Create professional component diagrams for documentation using PlantUML syntax.

**Time Required:** ~15 minutes

### Prerequisites
- PlantUML jar file or VS Code with PlantUML extension
- Java Runtime Environment (JRE) installed
- Text editor
- Graphviz (optional, for better layouts)

### Steps

1. **Install PlantUML**
   
   **Option A: VS Code Extension (Recommended)**
   - Open VS Code
   - Install "PlantUML" extension by jebbs
   - Install Graphviz: `sudo apt-get install graphviz` (Linux) or download for Windows/macOS
   
   **Option B: Command Line**
   ```bash
   wget https://sourceforge.net/projects/plantuml/files/plantuml.jar/download -O plantuml.jar
   ```

2. **Create your first diagram**
   Create `component_diagram.puml`:
   ```plantuml
   @startuml
   [Application Layer] as app
   [Middleware Layer] as middleware
   [Driver Layer] as driver
   [Hardware] as hw
   
   app --> middleware : uses
   middleware --> driver : calls
   driver --> hw : controls
   @enduml
   ```

3. **Generate diagram**
   
   **VS Code:** Press Alt+D (or Cmd+D on Mac) to preview
   
   **Command Line:**
   ```bash
   java -jar plantuml.jar component_diagram.puml
   ```
   Creates `component_diagram.png`

4. **Add more details**
   ```plantuml
   @startuml
   package "Control System" {
       [Main Controller]
       [State Machine]
       [Data Processor]
   }
   
   package "Communication" {
       [CAN Manager]
       [UART Handler]
   }
   
   package "Drivers" {
       [CAN Driver]
       [GPIO Driver]
       [ADC Driver]
   }
   
   [Main Controller] --> [State Machine]
   [Main Controller] --> [Data Processor]
   [Main Controller] ..> [CAN Manager] : uses
   [CAN Manager] --> [CAN Driver]
   [Data Processor] --> [ADC Driver]
   
   note right of [Main Controller]
       Runs at 10ms
       Priority: High
   end note
   @enduml
   ```

5. **Use different diagram types**
   
   **Sequence Diagram:**
   ```plantuml
   @startuml
   participant App
   participant CAN
   participant Hardware
   
   App -> CAN: send_message(data)
   CAN -> Hardware: transmit()
   Hardware --> CAN: success
   CAN --> App: OK
   @enduml
   ```
   
   **Class Diagram:**
   ```plantuml
   @startuml
   class SensorController {
       -sensors: Sensor[]
       +readSensor(id): float
       +calibrate(): void
   }
   
   class Sensor {
       +read(): float
       +calibrate(): void
   }
   
   SensorController "1" *-- "many" Sensor
   @enduml
   ```

6. **Embed in MkDocs**
   Add to your markdown file:
   ````markdown
   ```plantuml
   @startuml
   [Your diagram code here]
   @enduml
   ```
   ````

### Common Issues

**Issue:** Graphviz not found warning
- **Solution:** Install Graphviz package for better diagram layouts

**Issue:** Java not found
- **Solution:** Install JRE: `sudo apt-get install default-jre`

**Issue:** Diagram not rendering in VS Code
- **Solution:** Check PlantUML server settings, or use local rendering

**Issue:** Syntax errors in complex diagrams
- **Solution:** Use PlantUML web server (http://www.plantuml.com/plantuml/) to validate syntax

### References
- [PlantUML official documentation](https://plantuml.com/)
- [PlantUML component diagram guide](https://plantuml.com/component-diagram)
- [Real-world PlantUML examples](https://real-world-plantuml.com/)

---

## Template for Adding New How-To

When adding a new How-To guide, copy and paste this template:

```markdown
---

## How to [Title of Your How-To]

**Overview:** [Brief 1-2 sentence description of what this guide covers]

**Time Required:** ~[X] minutes

### Prerequisites
- [Item 1]
- [Item 2]
- [Item 3]

### Steps

1. **[Step 1 title]**
   [Detailed explanation]
   
   [Optional code block or command]

2. **[Step 2 title]**
   [Detailed explanation]

3. **[Continue with numbered steps...]**

### Common Issues

**Issue:** [Description of problem]
- **Solution:** [How to fix it]

**Issue:** [Another problem]
- **Solution:** [Another fix]

### References
- [Link to relevant documentation]
- [Link to related resources]
```
