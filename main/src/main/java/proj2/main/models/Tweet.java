package proj2.main.models;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tweets")
public class Tweet {
    private String tweet;
    private String reaction;
    public Tweet() {
    }
    public String getTweet() {
        return tweet;
    }
    public void setTweet(String tweet) {
        this.tweet = tweet;
    }
    public String getReaction() {
        return reaction;
    }
    public void setReaction(String reaction) {
        this.reaction = reaction;
    }
}
