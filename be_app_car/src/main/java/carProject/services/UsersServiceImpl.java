package carProject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import carProject.model.User;
import carProject.repository.UsersRepository;

@Service("UsersService")
public class UsersServiceImpl implements UsersService{
	private UsersRepository usersRepository;

    @Autowired
    public UsersServiceImpl(UsersRepository usersRepository){
        this.usersRepository = usersRepository;
    }
//    @Override
    public User create(User user) {
        return usersRepository.save(user);
    }


}
