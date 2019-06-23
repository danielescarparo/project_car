package carProject.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import carProject.model.Route;
import carProject.model.Automobile;
import carProject.model.CarPart;
import carProject.model.DetritionState;
import carProject.model.PartType;
import carProject.model.Race;
import carProject.repository.AutomobileRepository;

@Service("AutomobileService")
public class AutomobileServiceImpl implements AutomobileService{
	private AutomobileRepository automobileRepository;
	private Boolean clientAction; 

    @Autowired
    public 
    AutomobileServiceImpl(AutomobileRepository automobileRepository){
        this.automobileRepository = automobileRepository;
        this.clientAction = false;
    }
    
	@Override
	public void save(Automobile automobile) {
		automobileRepository.save(automobile);
	}
	
    @Override
    public void deleteAll(){
    	automobileRepository.deleteAll();
    }
    

	@Override
	public List<Automobile> findAll() {
		return automobileRepository.findAll();
	}

	@Override
	public List<Route> listRoute(){
		return Arrays.asList(Route.values()) ;
	}
	
	@Override
	public void sendRace(String id, Race race) {
		Optional<Automobile> automobile = automobileRepository.findById(id);
		
		automobile.get().updateInformations(race);
		
		automobileRepository.save(automobile.get());
		
		clientAction = true;
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
	public HashMap<String, Object> partsDescription(String id){
		Optional<Automobile> automobile = automobileRepository.findById(id);
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		if(automobile.isPresent()) {
			map.put("parts", automobile.get().description());
			return map;
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
	public List<CarPart> findPartsList(String id) {
		Optional<Automobile> automobile = automobileRepository.findById(id);
		List<CarPart> listaCarParts = new ArrayList<CarPart>();
		
		if(automobile.isPresent()) {			
			for(CarPart carPart : automobile.get().getCarPart()) {
				if(carPart.getStateModal().getValue() == DetritionState.PENDING.getValue()){
					listaCarParts.add(carPart);
				}	
			}	
		}
		return listaCarParts;	
	}

	@Override
	public List<HashMap<String, Object>> findPartsDetails(String id) {
		Optional<Automobile> automobile = automobileRepository.findById(id);
		List<HashMap<String, Object>> listMap = new ArrayList<HashMap<String, Object>>();
		
		if(automobile.isPresent()) {			
			for(CarPart carPart : automobile.get().getCarPart()) {						
					listMap.add(carPart.toMap(carPart));
			}	
		}	
	
		return listMap;
	}

	@Override
	public void acceptanceExchangeParts(String id, boolean state) {
		Optional<Automobile> automobile = automobileRepository.findById(id);

		if(automobile.isPresent()) {
			if(state == true) {		
				for(CarPart carPart : automobile.get().getCarPart()) {
					if(carPart.getStateModal().getValue() == DetritionState.PENDING.getValue()){
						carPart.setKmPresent(0.0);
						carPart.setWear(0);
						carPart.setStateModal(DetritionState.NONE);
					}	
				}			
			}else{
				for(CarPart carPart : automobile.get().getCarPart()) {
					if(carPart.getStateModal().getValue() == DetritionState.PENDING.getValue()){
						carPart.setStateModal(DetritionState.ALERT);
					}
				}				
			}
			
			automobileRepository.save(automobile.get());
		}		

	}

	@Override
	public HashMap<String, String> stateModalMechanic(String id) {
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
			hashMap.put("clientAction", Boolean.toString(clientAction));
			clientAction = false;
			return hashMap;
	
		}		
		return null;
	}

	@Override
	public void allMechanicPartsExchanges(String id, List<String> listaSelecionados) {
		Optional<Automobile> automobile = automobileRepository.findById(id);
		
		if(automobile.isPresent()) {
			if(!listaSelecionados.isEmpty()) {	
		
				List<CarPart> parts =  automobile.get().getCarPart();
				
				List<CarPart> selected = parts.stream().filter(part -> listaSelecionados.contains(part.getId())).collect(Collectors.toList());
				
				for(CarPart s : selected) {
					s.setStateModal(DetritionState.PENDING);
				}
			}
			automobileRepository.save(automobile.get());
		}		
	}
}
