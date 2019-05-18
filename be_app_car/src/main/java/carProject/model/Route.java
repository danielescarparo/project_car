package carProject.model;

public enum Route {
	VIA_PUBLICA(0), ESTRADA(1);

    int value;

    Route(int value){
        this.value = value;
    }

    public int getValue(){
        return value;
    }
}
