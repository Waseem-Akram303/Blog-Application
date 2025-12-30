const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const addBtn = document.getElementById("addBtn");
const blogsDiv = document.getElementById("blogs");
const error = document.getElementById("error");

// Page load ke time blogs array initialize karo
let blogsArray = JSON.parse(localStorage.getItem("blogs")) || [];

// Function to display blogs on page
function displayBlogs() {
    blogsDiv.innerHTML = ""; // Clear existing blogs
    blogsArray.forEach((blog, index) => {
        const blogDiv = document.createElement("div");
        blogDiv.classList.add("blog");
        blogDiv.innerHTML = `<h3>${blog.title}</h3> <p>${blog.content}</p>`;

        const blogDelBtn = document.createElement("button");
        blogDelBtn.classList.add("delBtn");
        blogDelBtn.textContent = "Delete";

        blogDelBtn.addEventListener("click", function(){
            const confirmBtn = confirm("Are you sure you want to delete it");
            if (confirmBtn) {
                blogsArray.splice(index, 1); // Remove from array
                localStorage.setItem("blogs", JSON.stringify(blogsArray));
                displayBlogs(); // Refresh displayed blogs
            }
        });

        blogDiv.appendChild(blogDelBtn);
        blogsDiv.appendChild(blogDiv);
    });
}

// Initial display on page load
displayBlogs();

// Add Blog button
addBtn.addEventListener("click", function(){
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title === "" && content === "") {
        error.textContent = "Please fill all fields";
        return;
    }
    if (title === "") {
        error.textContent = "Please enter blog title";
        return;
    }
    if (content === "") {
        error.textContent = "Please enter blog content";
        return;
    }

    error.textContent = "";

    const newBlog = { title, content };
    blogsArray.push(newBlog);
    localStorage.setItem("blogs", JSON.stringify(blogsArray));

    titleInput.value = "";
    contentInput.value = "";

    displayBlogs(); // Refresh displayed blogs
});
