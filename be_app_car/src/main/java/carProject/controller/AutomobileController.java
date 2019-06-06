package carProject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import carProject.services.AutomobileService;
import carProject.model.Automobile;
import carProject.model.CarPart;
import carProject.model.Route;
import carProject.model.Race;

import java.util.HashMap;
import java.util.List;


/*Automobile, recieves the http request to control car's data*/
@RestController
@RequestMapping("/carros")
public class AutomobileController {
    private AutomobileService automobileService;

    @Autowired
    public AutomobileController(AutomobileService automobileService){
        this.automobileService = automobileService;
    }	
    
    // Return save car in MongoDB
    @RequestMapping(value = "", method = RequestMethod.POST)
    @ResponseStatus(value=HttpStatus.OK)
    public void save(@RequestBody Automobile automobile){  
        automobileService.save(automobile);
    }
    
    // Delete all cars in MongoDB
    @RequestMapping(value = "", method = RequestMethod.DELETE)
    @ResponseStatus(value=HttpStatus.OK)
    public void deleteAll(){  
        automobileService.deleteAll();
    }
    
    /*Carro.js*/
    
    // Return all cars in MongoDB
    @RequestMapping(value = "", method = RequestMethod.GET)
    @ResponseStatus(value=HttpStatus.OK)
    public List<Automobile> findAll(){  
        return automobileService.findAll();
    }
    
    /*Cliente.js*/
    
    // Returns /corrida/meta
    @RequestMapping(value = "/rotas", method = RequestMethod.GET)
    @ResponseStatus(value=HttpStatus.OK)
    public List<Route> listRoute() {
        return automobileService.listRoute();
    }
    
    //  /sub
    @RequestMapping(value = "/{id}/corrida", method = RequestMethod.POST)
    @ResponseStatus(value=HttpStatus.OK)
    public void sendRace(
            @PathVariable("id") String id, 
            @RequestBody Race race) {    
    	automobileService.sendRace(id, race);
    }
    
    // Returns car with details of its parts
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseStatus(value=HttpStatus.OK)
    public Automobile findCar(
            @PathVariable("id") String id) {
        return automobileService.findCar(id);
    }
    
    // Returns PORCENTAGEM
    @RequestMapping(value = "/{id}/descricao", method = RequestMethod.GET)
    @ResponseStatus(value=HttpStatus.OK)
    public HashMap<String, Object> percentage(
            @PathVariable("id") String id) {
        return automobileService.partsDescription(id);
    }    
	
    // Returns modal information that will be displayed
    @RequestMapping(value = "/{id}/modal", method = RequestMethod.GET)
    @ResponseStatus(value=HttpStatus.OK)
    public HashMap<String, String> globalDetritionState( 
            @PathVariable("id") String id) {
        return automobileService.globalDetritionState(id);
    }

    // Returns list of parts that the mechanic wants to change
    @RequestMapping(value = "/{id}/trocas", method = RequestMethod.GET)
    @ResponseStatus(value=HttpStatus.OK)
    public List<CarPart> findPartsList( 
            @PathVariable("id") String id) {
        return automobileService.findPartsList(id);
    }
    
    /*Pecas.js*/
    
    // Returns list of parts with your information
    @RequestMapping(value = "/{id}/pecas", method = RequestMethod.GET)
    @ResponseStatus(value=HttpStatus.OK)
    public List<HashMap<String, Object>> findPartsDetails( 
            @PathVariable("id") String id) {
        return automobileService.findPartsDetails(id);
    }
    
    /*ModalConfirm.js*/
    
    //  Whether the parts will actually be changed or not
    @RequestMapping(value = "/{id}/pecas/trocadas", method = RequestMethod.POST)
    @ResponseStatus(value=HttpStatus.OK)
    public void acceptanceExchangeParts(
            @PathVariable("id") String id, 
            @RequestBody HashMap<String, Boolean> state) {
    
    	automobileService.acceptanceExchangeParts(id, state.get("state").booleanValue());
    }
    
    /*Mecanico.js*/
    
    //axios.get(`${Constants.URL}/carros/${this.props.match.params.id}/pecas`)
    
    // Returns the alert state that appears to the mechanic /modal
    @RequestMapping(value = "/{id}/mecanico", method = RequestMethod.GET)
    @ResponseStatus(value=HttpStatus.OK)
    public HashMap<String, String> stateModalMechanic( 
            @PathVariable("id") String id) {
        return automobileService.stateModalMechanic(id);
    }
    
    /*MecModalAlert.js*/
    // All parts that have been selected for exchange by the mechanic
    @RequestMapping(value = "/{id}/pecas/selecionadas", method = RequestMethod.POST)
    @ResponseStatus(value=HttpStatus.OK)
    public void allMechanicPartsExchanges(
            @PathVariable("id") String id, 
            @RequestBody List<String> listaSelecionados) {
        automobileService.allMechanicPartsExchanges(id, listaSelecionados);
    }   
}
