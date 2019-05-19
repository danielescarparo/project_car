package carProject.services;

import java.util.List;

import carProject.model.Automobile;
import carProject.model.CarPart;

public interface AutomobileService {
	public List<Automobile> findAll();
	public Automobile findCar(String id);
	public Automobile stateModal(String id);
	public Automobile findPartsList(String id);
	public List<CarPart> findPartsDetails(String id);
	public void acceptanceExchangeParts(String id, boolean state);
	public Automobile stateModalMechanic(String id);
	public void allMechanicPartsExchanges(String id, List<String>listaSelecionados);
	
}
