document.addEventListener('DOMContentLoaded', () => {
    const folderExplorer = document.getElementById('folder-explorer');

    // Function to fetch table hierarchy from server
    const fetchTableHierarchy = async () => {
        try {
            const response = await fetch('http://192.168.12.135:7103/api/table-hierarchy');
            const data = await response.json();
            renderFolderExplorer(data);
        } catch (error) {
            console.error('Error fetching table hierarchy:', error);
        }
    };

    // Function to render folder explorer
    const renderFolderExplorer = (data) => {
        const ul = document.createElement('ul');
        data.forEach(tableName => {
            const li = document.createElement('li');
            li.textContent = tableName;
            ul.appendChild(li);
        });
        folderExplorer.appendChild(ul);
    };

    // Fetch table hierarchy when DOM content is loaded
    fetchTableHierarchy();
});
