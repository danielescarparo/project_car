package carProject.services;

import java.util.HashMap;
import java.util.List;

import carProject.model.Route;
import carProject.model.Automobile;
import carProject.model.CarPart;
import carProject.model.Race;

public interface AutomobileService {
	public void save(Automobile automobile);
	public void deleteAll();
	public List<Automobile> findAll();
	public List<Route> listRoute();
	public void sendRace(String id, Race race);
	public Automobile findCar(String id);
	public List<HashMap<String, Object>> percentage(String id);
	public HashMap<String, String> globalDetritionState(String id);
	public List<CarPart> findPartsList(String id);
	public List<HashMap<String, Object>> findPartsDetails(String id);
	public void acceptanceExchangeParts(String id, boolean state);
	public HashMap<String, String> stateModalMechanic(String id);
	public void allMechanicPartsExchanges(String id, List<String>listaSelecionados);
}
