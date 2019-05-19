package carProject.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import carProject.model.User;

@Repository
public interface AutomobileRepository extends MongoRepository<Automobile, String>{

}
