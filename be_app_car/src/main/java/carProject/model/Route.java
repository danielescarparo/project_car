package carProject.model;

public enum Route {
   /**
    * Enum type route
    */
	VIA_PUBLICA(0), ESTRADA(1);

    int value;
    /**
     * Constructor
     */
    Route(int value){
        this.value = value;
    }

    public int getValue(){
        return value;
    }
}
