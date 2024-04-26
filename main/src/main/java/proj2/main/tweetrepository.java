package proj2.main;

import org.springframework.data.mongodb.repository.MongoRepository;

import proj2.main.models.*;

public interface tweetrepository extends MongoRepository<Tweet,String>{

}
