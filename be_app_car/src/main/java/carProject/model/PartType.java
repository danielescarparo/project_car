package carProject.model;

public enum PartType {
	DEPTH(0), THICKNESS(1), MONTHS(2);

    int value;

    PartType(int value){
        this.value = value;
    }

    public int getValue(){
        return value;
    }	

}
