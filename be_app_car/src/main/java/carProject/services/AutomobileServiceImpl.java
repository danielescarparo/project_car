package carProject.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import carProject.model.Automobile;
import carProject.model.CarPart;
import carProject.repository.AutomobileRepository;

public class AutomobileServiceImpl implements AutomobileService{
	private AutomobileRepository automobileRepository;

    @Autowired
    public AutomobileServiceImpl(AutomobileRepository automobileRepository){
        this.automobileRepository = automobileRepository;
    }
}
