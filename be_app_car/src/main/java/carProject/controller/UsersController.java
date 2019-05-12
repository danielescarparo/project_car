package carProject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import carProject.model.User;
import carProject.services.UsersService;

/*Users Controller, recieves the http request to control user's data*/
@RestController
@RequestMapping("/users")
public class UsersController {
	private UsersService usersService;

    @Autowired
    public UsersController(UsersService usersService){
        this.usersService = usersService;
    }
    
    // Create a new User in MongoDB
    @RequestMapping(value = "", method = RequestMethod.POST)
    @ResponseStatus(value=HttpStatus.CREATED)
    public User create(
            @RequestParam("name") String name,
            @RequestParam("userName") String userName,
            @RequestParam("email") String email,
            @RequestParam("password") String password){
        return usersService.create(new User(name, userName, email, password));
    }

}
