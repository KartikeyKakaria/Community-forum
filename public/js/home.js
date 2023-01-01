const topics = document.querySelector('.topics')
window.onload = ()=>{
    fetch('/getTopics')
    .then(rep=>rep.json())
    .then(data=>{
        data.data.forEach(topic=>{
            console.log(topic.imageName)
            let topicDiv = document.createElement('div');
            topicDiv.classList.add('topic');
            topicDiv.style.backgroundImage = `url(/images/${topic.imageName})`
            let heading = document.createElement('a');
            heading.href=`/topics/${topic.name}`;
            heading.innerText = topic.name;
            let paragraph = document.createElement('p');
            paragraph.innerHTML = shortenString(topic.definition,heading.href);
            topicDiv.appendChild(heading);
            topicDiv.appendChild(paragraph);
            topics.appendChild(topicDiv)
        })
    })
    .catch(err=>{
        console.log(err)
    })
}