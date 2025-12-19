import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RESUME_PATH = path.join(__dirname, '../content_sources/resume.txt');
const OUTPUT_PATH = path.join(__dirname, '../src/assets/content/profile.json');

function parseResume(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);

    const profile = {
        basics: {
            "name": "Sai Sambhu Prasad Kalaga",
            "label": "AI/ML Engineer & Data Scientist",
            "email": "saisambhuprasadkalaga@gmail.com",
            "summary": "AI Engineer and Data Scientist with a strong background in Computer Science. Experienced in building intelligence platforms, RAG pipelines, and ML models. Passionate about leveraging AI to solve complex problems.",
            "location": {
                "address": "",
                "postalCode": "",
                "city": "Austin",
                "countryCode": "US",
                "region": "Texas"
            },
            "profiles": [
                {
                    "network": "LinkedIn",
                    "username": "sai-sambhu-prasad-kalaga",
                    "url": "https://www.linkedin.com/in/sai-sambhu-prasad-kalaga"
                },
                {
                    "network": "GitHub",
                    "username": "sambhukalaga27",
                    "url": "https://github.com/sambhukalaga27"
                }
            ]
        },
        education: [],
        work: [],
        projects: [],
        skills: [],
        awards: []
    };

    let currentSection = '';
    let currentItem = null;

    // Helper to finalize an item before switching
    const pushCurrentItem = () => {
        if (!currentItem) return;
        if (currentSection === 'EDUCATION') profile.education.push(currentItem);
        if (currentSection === 'EXPERIENCE') profile.work.push(currentItem);
        if (currentSection === 'PROJECTS') profile.projects.push(currentItem);
        if (currentSection === 'ACHIEVEMENTS') profile.awards.push(currentItem);
        currentItem = null;
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Section Detection
        if (['EDUCATION', 'EXPERIENCE', 'PROJECTS', 'SKILLS', 'ACHIEVEMENTS'].includes(line.toUpperCase())) {
            pushCurrentItem();
            currentSection = line.toUpperCase();
            continue;
        }

        if (currentSection === 'EDUCATION') {
            if (line.startsWith('-')) {
                pushCurrentItem();
                // Parse Education Line
                // Format: - Degree, Institution, Location GPA: ... | Date
                const parts = line.replace(/^-/, '').trim().split(',');
                const degree = parts[0]?.trim();
                const institution = parts[1]?.trim();

                // Extract Date and GPA from the end
                const dateMatch = line.match(/\| (.*)$/);
                const gpaMatch = line.match(/GPA: ([0-9.]+\/[0-9.]+)/);

                currentItem = {
                    institution: institution || "Unknown",
                    studyType: degree || "Degree",
                    startDate: dateMatch ? dateMatch[1].split('-')[0].trim() : "",
                    endDate: dateMatch ? dateMatch[1].split('-')[1]?.trim() : "",
                    score: gpaMatch ? gpaMatch[1] : "",
                    courses: []
                };
            }
        } else if (currentSection === 'EXPERIENCE') {
            // Heuristic: Company line usually doesn't start with -
            if (!line.startsWith('-')) {
                pushCurrentItem();
                // Parse Company Line
                // Format: Role, Company, Location Date
                // This is tricky with the provided format, let's try to split by comma
                const parts = line.split(',');
                const role = parts[0]?.trim();
                const company = parts[1]?.trim();

                // Date is usually at the end, separated by spaces or tabs in the text file
                // We might need a regex to find the date pattern at the end
                const dateRegex = /((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\s*–\s*(?:Present|(?:\w+\s+\d{4})))/i;
                const dateMatch = line.match(dateRegex);

                currentItem = {
                    name: company || "Unknown",
                    position: role || "Role",
                    startDate: dateMatch ? dateMatch[1].split('–')[0].trim() : "",
                    endDate: dateMatch ? dateMatch[1].split('–')[1]?.trim() : "Present",
                    highlights: [],
                    location: parts[2]?.trim() || ""
                };
            } else if (line.startsWith('-') && currentItem) {
                currentItem.highlights.push(line.replace(/^-/, '').trim());
            }
        } else if (currentSection === 'PROJECTS') {
            if (!line.startsWith('-')) {
                pushCurrentItem();
                // Project Name Date
                const dateRegex = /((?:Summer|Spring|Fall|Winter)\s+\d{4})/i;
                const dateMatch = line.match(dateRegex);
                const name = line.replace(dateRegex, '').trim();

                currentItem = {
                    name: name,
                    description: "",
                    highlights: [],
                    startDate: dateMatch ? dateMatch[1] : "",
                    keywords: []
                };
            } else if (line.startsWith('-') && currentItem) {
                currentItem.highlights.push(line.replace(/^-/, '').trim());
                // Use the first highlight as description if empty
                if (!currentItem.description) {
                    currentItem.description = line.replace(/^-/, '').trim();
                }
            }
        } else if (currentSection === 'SKILLS') {
            if (line.startsWith('-')) {
                const parts = line.replace(/^-/, '').split(':');
                const category = parts[0]?.trim();
                const items = parts[1]?.split(',').map(s => s.trim()) || [];

                profile.skills.push({
                    name: category,
                    keywords: items
                });
            }
        } else if (currentSection === 'ACHIEVEMENTS') {
            if (line.startsWith('-')) {
                profile.awards.push({
                    title: line.replace(/^-/, '').trim(),
                    date: "",
                    awarder: "",
                    summary: ""
                });
            }
        }
    }
    pushCurrentItem();

    return profile;
}

try {
    console.log('Reading resume from:', RESUME_PATH);
    if (fs.existsSync(RESUME_PATH)) {
        const content = fs.readFileSync(RESUME_PATH, 'utf-8');
        const profile = parseResume(content);

        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(profile, null, 2));
        console.log('Successfully generated profile.json at:', OUTPUT_PATH);
    } else {
        console.error('Resume file not found at:', RESUME_PATH);
        process.exit(1);
    }
} catch (error) {
    console.error('Error generating profile:', error);
    process.exit(1);
}
