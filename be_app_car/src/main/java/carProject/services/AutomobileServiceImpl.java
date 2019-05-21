package carProject.services;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import carProject.model.Automobile;
import carProject.model.CarPart;
import carProject.model.DetritionState;
import carProject.repository.AutomobileRepository;

@Service("AutomobileService")
public class AutomobileServiceImpl implements AutomobileService{
	private AutomobileRepository automobileRepository;

    @Autowired
    public 
    AutomobileServiceImpl(AutomobileRepository automobileRepository){
        this.automobileRepository = automobileRepository;
    }

	@Override
	public List<Automobile> findAll() {
		return automobileRepository.findAll();
	}

	@Override
	public Automobile findCar(String id) {
		Optional<Automobile> automobile = automobileRepository.findById(id);
		
		if(automobile.isPresent()) {
			return automobile.get();
	
		}
		
		return null;
	}	

	@Override
	public HashMap<String, String> globalDetritionState(String id) {
		Optional<Automobile> automobile = automobileRepository.findById(id);
		DetritionState stateModal = DetritionState.NONE;
		
		if(automobile.isPresent()) {			
			for(CarPart carPart : automobile.get().getCarPart()) {
				if(stateModal.getValue() < carPart.getStateModal().getValue()) {
					stateModal = carPart.getStateModal();				
				}
			}
			HashMap<String, String> hashMap = new HashMap<String, String>();
			hashMap.put("stateModal", stateModal.name());
			return hashMap;
	
		}		
		return null;
	}

	@Override
	public Automobile findPartsList(String id) {
//		Optional<Automobile> automobile = automobileRepository.findById(id);
//		
//		if(automobile.isPresent()) {			
//			for(CarPart carPart : automobile.get().getCarPart()) {
//				if(carPart.getId()automobile.equals(obj))
//				automobile.get().getCarPart().remove(JOSE);
//			}	
//		}	
//		
		return null;
	}

	@Override
	public List<CarPart> findPartsDetails(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void acceptanceExchangeParts(String id, boolean state) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Automobile stateModalMechanic(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void allMechanicPartsExchanges(String id, List<String> listaSelecionados) {
		// TODO Auto-generated method stub
		
	}
}
