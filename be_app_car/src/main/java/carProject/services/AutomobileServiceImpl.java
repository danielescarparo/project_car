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
   /**
    * class service automobile
    */
	private AutomobileRepository automobileRepository;
	private Boolean clientAction; 

    /**
     * Constructor
     */
    @Autowired
    public 
    AutomobileServiceImpl(AutomobileRepository automobileRepository){
        this.automobileRepository = automobileRepository;
        this.clientAction = false;
    }
    
    /**
     * Save car in MongoDB
     * @param Automobile
     */
	@Override
	public void save(Automobile automobile) {
		automobileRepository.save(automobile);
	}
	
    /**
     * Delete all cars in MongoDB
     */
    @Override
    public void deleteAll(){
    	automobileRepository.deleteAll();
    }
    
    /**
     * Responsible for searching all cars
     * @return car list
     */
	@Override
	public List<Automobile> findAll() {
		return automobileRepository.findAll();
	}

    /**
     * Responsible for searching all route
     * @return route list
     */
	@Override
	public List<Route> listRoute(){
		return Arrays.asList(Route.values()) ;
	}
	
    /**
     * Send race traveled to be saved
     * @param car id
     * @param run through
     */
	@Override
	public void sendRace(String id, Race race) {
		Optional<Automobile> automobile = automobileRepository.findById(id);
		
		automobile.get().updateInformations(race);
		
		automobileRepository.save(automobile.get());
		
		clientAction = true;
	}
	
    /**
     * Find car with details of its parts
     * @param car id
     * @return automobile
     */
	@Override
	public Automobile findCar(String id) {
		Optional<Automobile> automobile = automobileRepository.findById(id);
		
		if(automobile.isPresent()) {
			return automobile.get();
	
		}
		
		return null;
	}
	
    /**
     * Calculates the percentage of each part
     * @param car id
     * @return HashMap<String, Object>
     */
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

    /**
     * Modal information that will be displayed
     * @param car id
     * @return HashMap<String, Object>
     */
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

    /**
     * List of parts that the mechanic wants to change
     * @param car id
     * @return parts list
     */
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
	
    /**
     * List of parts with your information
     * @param car id
     * @return List<HashMap<String, Object>>
     */  
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
	
    /**
     * Whether the parts will actually be changed or not
     * @param car id
     * @param state
     */
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
	
    /**
     *  Returns the alert state that appears to the mechanic
     * @param car id
     * @return HashMap<String, Object>
     */ 
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
    /**
     * All parts that have been selected for exchange by the mechanic
     * @param car id
     * @param lista dos selecionados
     */
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
