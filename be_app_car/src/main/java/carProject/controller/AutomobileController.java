package carProject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import carProject.services.AutomobileService;
import carProject.model.Automobile;
import carProject.model.CarPart;
import carProject.model.Route;
import carProject.model.Race;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/carros")
public class AutomobileController {
   /**
    * Automobile, recieves the http request to control car's data
    */
    private AutomobileService automobileService;

    /**
     * Constructor
     */
    @Autowired
    public AutomobileController(AutomobileService automobileService){
        this.automobileService = automobileService;
    }	
    
    /**
     * Save car in MongoDB
     * @param Automobile
     */
    @RequestMapping(value = "", method = RequestMethod.POST)
    @ResponseStatus(value=HttpStatus.OK)
    public void save(@RequestBody Automobile automobile){  
        automobileService.save(automobile);
    }
    
    /**
     * Delete all cars in MongoDB
     */
    @RequestMapping(value = "", method = RequestMethod.DELETE)
    @ResponseStatus(value=HttpStatus.OK)
    public void deleteAll(){  
        automobileService.deleteAll();
    }
    
    /**
     * Responsible for searching all cars
     * @return car list
     */
    @RequestMapping(value = "", method = RequestMethod.GET)
    @ResponseStatus(value=HttpStatus.OK)
    public List<Automobile> findAll(){  
        return automobileService.findAll();
    }
    
    /**
     * Responsible for searching all route
     * @return route list
     */
    @RequestMapping(value = "/rotas", method = RequestMethod.GET)
    @ResponseStatus(value=HttpStatus.OK)
    public List<Route> listRoute() {
        return automobileService.listRoute();
    }
    
    /**
     * Send race traveled to be saved
     * @param car id
     * @param run through
     */
    @RequestMapping(value = "/{id}/corrida", method = RequestMethod.POST)
    @ResponseStatus(value=HttpStatus.OK)
    public void sendRace(
            @PathVariable("id") String id, 
            @RequestBody Race race) {    
    	automobileService.sendRace(id, race);
    }
    
    /**
     * Find car with details of its parts
     * @param car id
     * @return automobile
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseStatus(value=HttpStatus.OK)
    public Automobile findCar(
            @PathVariable("id") String id) {
        return automobileService.findCar(id);
    }
    
    /**
     * Calculates the percentage of each part
     * @param car id
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/{id}/descricao", method = RequestMethod.GET)
    @ResponseStatus(value=HttpStatus.OK)
    public HashMap<String, Object> percentage(
            @PathVariable("id") String id) {
        return automobileService.partsDescription(id);
    }  
    
    /**
     * Modal information that will be displayed
     * @param car id
     * @return HashMap<String, Object>
     */
    @RequestMapping(value = "/{id}/modal", method = RequestMethod.GET)
    @ResponseStatus(value=HttpStatus.OK)
    public HashMap<String, String> globalDetritionState( 
            @PathVariable("id") String id) {
        return automobileService.globalDetritionState(id);
    }
    
    /**
     * List of parts that the mechanic wants to change
     * @param car id
     * @return parts list
     */
    @RequestMapping(value = "/{id}/trocas", method = RequestMethod.GET)
    @ResponseStatus(value=HttpStatus.OK)
    public List<CarPart> findPartsList( 
            @PathVariable("id") String id) {
        return automobileService.findPartsList(id);
    }
    
    /**
     * List of parts with your information
     * @param car id
     * @return List<HashMap<String, Object>>
     */    
    @RequestMapping(value = "/{id}/pecas", method = RequestMethod.GET)
    @ResponseStatus(value=HttpStatus.OK)
    public List<HashMap<String, Object>> findPartsDetails( 
            @PathVariable("id") String id) {
        return automobileService.findPartsDetails(id);
    }
    
    /**
     * Whether the parts will actually be changed or not
     * @param car id
     * @param state
     */
    @RequestMapping(value = "/{id}/pecas/trocadas", method = RequestMethod.POST)
    @ResponseStatus(value=HttpStatus.OK)
    public void acceptanceExchangeParts(
            @PathVariable("id") String id, 
            @RequestBody HashMap<String, Boolean> state) {
    
    	automobileService.acceptanceExchangeParts(id, state.get("state").booleanValue());
    }
    
    /**
     *  Returns the alert state that appears to the mechanic
     * @param car id
     * @return HashMap<String, Object>
     */ 
    @RequestMapping(value = "/{id}/mecanico", method = RequestMethod.GET)
    @ResponseStatus(value=HttpStatus.OK)
    public HashMap<String, String> stateModalMechanic( 
            @PathVariable("id") String id) {
        return automobileService.stateModalMechanic(id);
    }
    
    /**
     * All parts that have been selected for exchange by the mechanic
     * @param car id
     * @param lista dos selecionados
     */
    @RequestMapping(value = "/{id}/pecas/selecionadas", method = RequestMethod.POST)
    @ResponseStatus(value=HttpStatus.OK)
    public void allMechanicPartsExchanges(
            @PathVariable("id") String id, 
            @RequestBody HashMap<String, Object> listaSelecionados) {
    		String selecionado = (String) listaSelecionados.get("listaselected");
    		List<String> selecionados = Arrays.asList(selecionado.split(","));
    		System.out.println("Hello" + listaSelecionados);
        automobileService.allMechanicPartsExchanges(id, selecionados);
    }   
}
