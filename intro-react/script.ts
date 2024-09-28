
interface Project {
    id: number;
    date: {
        day: string;
        month: string;
        year: string;
    };
    description: string;
}


async function getJson(): Promise<Record<string, Project> | undefined> {
    const getURL = "http://localhost:3000/getjson";
    try {
        const response = await fetch(getURL);
        if (!response.ok) {
            throw new Error("You Ducked Up");
        }
        const data: Record<string, Project> = await response.json();
        return data;
    } catch (error) {
        console.error("Unable to fetch data:", error);
        return undefined;
    }
}


export async function handleProjects(): Promise<void> {
    const projects = await getJson();
    if (!projects) return;

    const keys = Object.keys(projects);
    const element = document.getElementById("projectsDiv");

    if (!element) return;

    for (const key of keys) {
        const a = document.createElement("a");
        const li = document.createElement("li");
        const para = document.createElement("p"); 

        const linkText = document.createTextNode(key);

        a.appendChild(linkText);
        a.title = key;
        a.href = `/${key}`;
        li.appendChild(a);

        para.textContent = projects[key].description;

        element.appendChild(li);
        element.appendChild(para);
    }
}


export async function postjson(event: Event, form: HTMLFormElement): Promise<void> {
    event.preventDefault();
    
    const formData = new FormData(form);
    const postURL = "http://localhost:3000/postjson";
    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const description = formData.get("description") as string;

    if (!title || !date || !description) {
        console.error("Missing form data");
        return;
    }

    const [year, month, day] = date.split("-");
    
    try {
        const response = await fetch(postURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                [title]: {
                    id: Date.now(),
                    date: {
                        day: day,
                        month: month,
                        year: year,
                    },
                    description: description,
                }
            })
        });

        if (!response.ok) {
            throw new Error("Failed to post data");
        }

        console.log("Replacing Window");
        window.location.replace("/");
    } catch (error) {
        console.error("Error posting data:", error);
    }
}
