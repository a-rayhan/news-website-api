const categoryContainer = document.getElementById('category-container');
const newsContainer = document.getElementById('news-container');
const loadMore = document.getElementById('load-more');

const loadNewsCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    const allNewsCategory = data.data.news_category;

    allNewsCategory.slice(0, 6).forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <a onclick="allNewsInCategory('${category.category_id}')" class="tab text-xl text-black hover:bg-slate-100 hover:rounded-md mr-1 mb-5">
                ${category?.category_name}
            </a>
        `;
        categoryContainer.appendChild(div);
    })
}

const allNewsInCategory = async (category_id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`);
    const data = await response.json();
    const categoryNews = data.data;

    newsContainer.innerText = '';

    categoryNews.forEach((news) => {
        const div = document.createElement('div');
        div.classList = 'news-card-elem';
        div.innerHTML = `
        <div class="border-2 border-black p-4 flex justify-between rounded-lg mb-5">
            <div class="w-72 h-40 bg-slate-300 rounded-xl">
                <img src="${news.image_url}" alt="" class="w-full object-cover h-full rounded-lg">
            </div>

            <div class="w-[680px]">
                <div>
                    <h1 class="text-2xl font-bold mb-2">
                        ${news.title}
                    </h1>

                    <p class="mb-3">
                        U.S. President Joe Biden has announced nearly $3 billion in new U.S. military aid for
                        Kyiv
                        as
                        Ukraine marked its independence day six months after Russia invaded the country...
                        <span class="underline ml-2 cursor-pointer text-blue-400">
                            Read more
                        </span>
                    </p>

                </div>
            </div>
        </div>`

        newsContainer.appendChild(div)
    })

}


// Load more funtionality
let currentItems = 4;

loadMore.addEventListener('click', (e) => {
    const elemList = [...document.querySelectorAll('.news-card-elem')];
    // console.log(elemList.length);

    for (let i = currentItems; i < currentItems + 4; i++) {
        if (elemList[i]) {
            console.log(elemList[i]);
            elemList[i].style.display = 'block';
        }
    }
    currentItems += 4;
})


loadNewsCategory();
allNewsInCategory('01')