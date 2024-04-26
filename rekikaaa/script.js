// Function to analyze sentiment
function analyzeSentiment(tweet) {
    const wordEmojis = {
        "happy": { emoji: "😊", sentiment: "POSITIVE" },
        "joyful": { emoji: "😄", sentiment: "POSITIVE" },
        "great": { emoji: "👍", sentiment: "POSITIVE" },
        "excited": { emoji: "😃", sentiment: "POSITIVE" },
        "awesome": { emoji: "😎", sentiment: "POSITIVE" },
        "fantastic": { emoji: "🌟", sentiment: "POSITIVE" },
        "amazing": { emoji: "😲", sentiment: "POSITIVE" },
        "wonderful": { emoji: "😍", sentiment: "POSITIVE" },
        "loved": { emoji: "❤️", sentiment: "POSITIVE" },
        "excellent": { emoji: "👌", sentiment: "POSITIVE" },
        "brilliant": { emoji: "🌈", sentiment: "POSITIVE" },
        "enjoyed": { emoji: "🎉", sentiment: "POSITIVE" },
        "delighted": { emoji: "😁", sentiment: "POSITIVE" },
        "good": { emoji: "😁", sentiment: "POSITIVE" },
        "cheerful": { emoji: "😆", sentiment: "POSITIVE" },
        "satisfied": { emoji: "😌", sentiment: "POSITIVE" },
        "beautiful": { emoji: "🌺", sentiment: "POSITIVE" },
        "grateful": { emoji: "🙏", sentiment: "POSITIVE" },
        "vibrant": { emoji: "💫", sentiment: "POSITIVE" },
        "glad": { emoji: "😊", sentiment: "POSITIVE" },
        "content": { emoji: "😌", sentiment: "POSITIVE" },
        // Add more words and emojis as needed
        "sad": { emoji: "😞", sentiment: "NEGATIVE" },
        "angry": { emoji: "😠", sentiment: "NEGATIVE" },
        "disappointed": { emoji: "😔", sentiment: "NEGATIVE" },
        "hated": { emoji: "😡", sentiment: "NEGATIVE" },
        "terrible": { emoji: "😫", sentiment: "NEGATIVE" },
        "horrible": { emoji: "😱", sentiment: "NEGATIVE" },
        "awful": { emoji: "😖", sentiment: "NEGATIVE" },
        "disgusted": { emoji: "🤢", sentiment: "NEGATIVE" },
        "bad": { emoji: "👎", sentiment: "NEGATIVE" },
        "unhappy": { emoji: "😞", sentiment: "NEGATIVE" },
        "annoyed": { emoji: "😠", sentiment: "NEGATIVE" },
        "frustrated": { emoji: "😤", sentiment: "NEGATIVE" },
        "miserable": { emoji: "😔", sentiment: "NEGATIVE" },
        "worried": { emoji: "😟", sentiment: "NEGATIVE" },
        "shit": {
            emoji: "💩",
            sentiment: "NEGATIVE"
        },
        "uncomfortable": { emoji: "😔", sentiment: "NEGATIVE" },

        // Add more words and emojis as needed for negative sentiment
    };

    const words = tweet.toLowerCase().split(/\W+/);
    let sentimentEmoji = "";
    let sentimentWord = "NEUTRAL";

    words.forEach(word => {
        if (word in wordEmojis) {
            // If the word is found in the wordEmojis object, add its corresponding emoji to the sentiment score
            sentimentEmoji += wordEmojis[word].emoji + " ";
            // Set the sentiment word based on the presence of positive or negative emojis
            if (wordEmojis[word].sentiment === "POSITIVE") {
                sentimentWord = "POSITIVE";
            } else if (wordEmojis[word].sentiment === "NEGATIVE") {
                sentimentWord = "NEGATIVE";
            }
        }
    });

    // Return the sentiment emoji and word
    return { emoji: sentimentEmoji.trim(), sentiment: sentimentWord };
}

const getTweets = () => {
    fetch("http://192.168.2.193:8080/tweets").then((response) => response.json()).then((json) => {
        const total = json.length;
        negative = 0
        json.forEach((obj) => {
            if (obj["reaction"] == "NEGATIVE") {
                negative++;
            };
        })

        positive = 0;
        json.forEach((obj) => {
            if (obj["reaction"] == "POSITIVE") {
                positive++;
            };
        })


        const positiveentry = Math.round(positive / total * 100);
        const negativeentry = Math.round(negative / total * 100);
        const resultDiv = document.getElementById("percentage");
        resultDiv.innerHTML = `Positive percentage : ${positiveentry}  Negative percentage : ${negativeentry} Rest are neutral`;

        json.forEach((obj) => {
            // Perform sentiment analysis
            const sentiment = analyzeSentiment(obj["tweet"]);



            // Update table with tweet and sentiment
            updateTable(obj["tweet"], sentiment);
        })
    })
}

const addTweet = (tweet, sentiment) => {
    let options = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "tweet": tweet,
            "reaction": sentiment
        }),
    }

    fetch("http://192.168.2.193:8080/addtweet", options).then((response => console.log(response.json()))).then(
        () => {
            const table = document.getElementById("tweetTable");
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }
            getTweets();
        }
    )
}



// Function to update table with tweet and sentiment
function updateTable(tweet, sentiment) {
    const table = document.getElementById("tweetTable");

    const newRow = table.insertRow(-1);
    const srNoCell = newRow.insertCell(0);
    const tweetCell = newRow.insertCell(1);
    const sentimentCell = newRow.insertCell(2);

    srNoCell.textContent = table.rows.length - 1;
    tweetCell.textContent = tweet;
    sentimentCell.textContent = `${sentiment.sentiment} ${sentiment.emoji}`;

}

// Event listener for form submission
document.getElementById("tweetForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission



    // Get the tweet text from the form
    const tweet = document.getElementById("tweet").value;

    // Perform sentiment analysis
    const sentiment = analyzeSentiment(tweet);

    // Update UI with sentiment analysis result
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<p>${tweet}</p><p>Sentiment: ${sentiment.sentiment} ${sentiment.emoji}</p>`;

    addTweet(tweet, sentiment.sentiment);

});