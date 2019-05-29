package carProject.services;

import java.util.HashMap;
import java.util.List;

import carProject.model.Automobile;
import carProject.model.CarPart;

public interface AutomobileService {
	public void save(Automobile automobile);
	public void deleteAll();
	public List<Automobile> findAll();
	public Automobile findCar(String id);
	public HashMap<String, String> globalDetritionState(String id);
	public List<CarPart> findPartsList(String id);
	public List<HashMap<String, Object>> findPartsDetails(String id);
	public void acceptanceExchangeParts(String id, boolean state);
	public HashMap<String, String> stateModalMechanic(String id);
	public void allMechanicPartsExchanges(String id, List<String>listaSelecionados);
}
