package carProject.model;

import java.util.HashMap;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "carpart")
public class CarPart {
    @Id
    private String id;
    private String name;
    private Route route;
    private Double kmLifespan;
    private Double kmPresent;  
    private DetritionState stateModal;
    private PartType partType;
    private float validity;
    private float wear;

	public CarPart(String name, Route route, Double kmLifespan, Double kmPresent, DetritionState stateModal,
			PartType partType, float validity, float wear) {
		super();
		this.name = name;
		this.route = route;
		this.kmLifespan = kmLifespan;
		this.kmPresent = kmPresent;
		this.stateModal = stateModal;
		this.partType = partType;
		this.validity = validity;
		this.wear = wear;
	} 
	
	public String getId() {
		return id;
	}


	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public Route getRoute() {
		return route;
	}



	public void setRoute(Route route) {
		this.route = route;
	}



	public Double getKmLifespan() {
		return kmLifespan;
	}



	public void setKmLifespan(Double kmLifespan) {
		this.kmLifespan = kmLifespan;
	}



	public Double getKmPresent() {
		return kmPresent;
	}



	public void setKmPresent(Double kmPresent) {
		this.kmPresent = kmPresent;
	}



	public DetritionState getStateModal() {
		return stateModal;
	}



	public void setStateModal(DetritionState stateModal) {
		this.stateModal = stateModal;
	}



	public PartType getPartType() {
		return partType;
	}



	public void setPartType(PartType partType) {
		this.partType = partType;
	}



	public float getValidity() {
		return validity;
	}



	public void setValidity(float validity) {
		this.validity = validity;
	}



	public float getWear() {
		return wear;
	}



	public void setWear(float wear) {
		this.wear = wear;
	}



	public HashMap<String, Object> toMap(CarPart carPart){
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		map.put("id", carPart.id);
		map.put("name", carPart.name);
		map.put("route", carPart.route);
		map.put("kmLifespan", carPart.kmLifespan);
		map.put("kmPresent", carPart.kmPresent);
		map.put("stateModal", carPart.stateModal);
		map.put("partType", carPart.partType);
		map.put("validity", carPart.validity);
		map.put("wear", carPart.wear);
		
		switch(partType) {
			case DEPTH:
				map.put("description", "Profundidade(mm)");
				break;
			case THICKNESS:
				map.put("description", "Espessura(mm)");
				break;
			case MONTHS:
				map.put("description", "Meses");
				break;
		}
		
		return map;
		
//	    HashMap<String, String> newMap = new HashMap<String, String>();
//	    for (HashMap.Entry<String, Object> entry : map.entrySet()) {
//	        newMap.put(entry.getKey(), (String) entry.getValue());
//	    }
//
//	    return newMap;

	}
	
	public void uptadeState() {
		switch(partType) {
		case DEPTH:
		case THICKNESS:
			if((kmPresent > kmLifespan * 0.8) || (wear > validity * 0.8)){ //80%
				stateModal = DetritionState.ALERT;
			}else if((kmPresent > kmLifespan * 0.5) || (wear > (validity * 0.5))) { //50%
				stateModal = DetritionState.WARNING;
			}
			break;
		case MONTHS:
			if(kmPresent > kmLifespan * 0.8){ 
				stateModal = DetritionState.ALERT;
			}else if(kmPresent > kmLifespan * 0.5) { //50%
				stateModal = DetritionState.WARNING;
			}
			break;		
		}
	}
	
	private int percentage() {
		
		if((getPartType() == PartType.DEPTH) || (getPartType() == PartType.THICKNESS)){
			int percentageWear = (int) (100 * wear / validity);
			int percetageKm = (int) ((100 * kmPresent) / kmLifespan);
			
			return percentageWear > percetageKm ? percentageWear : percetageKm;						
		}else if (getPartType() == PartType.MONTHS) {
			return (int) ((100 * kmPresent) / kmLifespan);
		}
		return 0;
	}
	
	public HashMap<String, Object> description() {
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		int percentage = percentage();
		
		map.put("state", percentage > 100? 100 : percentage);
		map.put("name", name);
		
		switch(partType) {
		case DEPTH:		
			map.put("description", "Profundidade em mm (desgaste)");
			break;
		case THICKNESS:
			map.put("description", "Espessura em mm (desgaste)");
			break;
		case MONTHS:
			map.put("description", "Meses");
			break;
		}		
		return map;
	}	
}