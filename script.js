        // The array of course objects
        const aCourses = [{
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            completed: true
        }, {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            completed: false
        }, {
            subject: 'CSE',
            number: 121,
            title: 'Programming with Functions',
            credits: 2,
            completed: false
        }, {
            subject: 'WDD',
            number: 101,
            title: 'Intro to Web Design',
            credits: 2,
            completed: true
        }, {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 3,
            completed: false
        }, {
            subject: 'WDD',
            number: 231,
            title: 'Web Frontend Development II',
            credits: 3,
            completed: false
        }, ];

        // Function to render the course list
        function renderCourses(courses) {
            const listElement = document.getElementById('course-list');
            listElement.innerHTML = '';
            courses.forEach(course => {
                const li = document.createElement('li');
                li.className = 'p-4 rounded-md shadow-sm border border-gray-200';
                if (course.completed) {
                    li.classList.add('completed-course');
                }
                li.innerHTML = `
                    <p class="font-bold">${course.subject} ${course.number} - ${course.title}</p>
                    <p class="text-sm text-gray-500">${course.credits} credits</p>
                `;
                listElement.appendChild(li);
            });
            updateTotalCredits(courses);
        }

        // Function to update the total credits display
        function updateTotalCredits(courses) {
            const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
            document.getElementById('total-credits').textContent = totalCredits;
        }

        // Add event listeners to filter buttons
        document.getElementById('all-btn').addEventListener('click', () => {
            renderCourses(aCourses);
        });

        document.getElementById('cse-btn').addEventListener('click', () => {
            const filteredCourses = aCourses.filter(course => course.subject === 'CSE');
            renderCourses(filteredCourses);
        });

        document.getElementById('cit-btn').addEventListener('click', () => {
            const filteredCourses = aCourses.filter(course => course.subject === 'CIT');
            renderCourses(filteredCourses);
        });

        document.getElementById('wdd-btn').addEventListener('click', () => {
            const filteredCourses = aCourses.filter(course => course.subject === 'WDD');
            renderCourses(filteredCourses);
        });

        // Add dynamic footer dates
        document.getElementById('copyright-year').textContent = new Date().getFullYear();
        document.getElementById('last-modified').textContent = document.lastModified;

        // Initial render of all courses on page load
        document.addEventListener('DOMContentLoaded', () => {
            renderCourses(aCourses);
        });