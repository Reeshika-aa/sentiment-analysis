package proj2.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import proj2.main.tweetrepository;
import proj2.main.models.Tweet;

@RestController
public class tweetcontroller {

    @Autowired
    tweetrepository repository;

    @CrossOrigin
    @GetMapping("tweets")
    public List<Tweet> getTweet(){
        return repository.findAll();
    }

    @CrossOrigin
    @PostMapping("/addtweet")
    public Tweet addTweet(@RequestBody Tweet tweet){
        return repository.save(tweet);
    }
    
}
