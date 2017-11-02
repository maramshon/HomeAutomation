//data=motionDetect
//u will send me back motion or nomotion


char data;                            // declaring a data variable  that will store the data from the server. 
int counter = 0;                      // declaring a counter  variable  that will store the number of motions detected.
int pir = 4;                          // declaring a pir  variable  that will store the number of the pin that the pir "The Motion sensor"  will be connected to.
int alarm = 2;                        // declaring an alarm  variable  that will store the number of the pin that the pir alarm  will be connected to.
void setup()                          // The main function that sets up the arduino configuration 
{
  Serial.begin(9600);                // Begin the serial communication and set the data rate in bits per second (baud)  to 9600 baud.
  pinMode(2, OUTPUT);                // set the mode of the pin number 2 on the ardiuno to be output pin.
}
void loop()                         // in finite loop that will repeat the code for ever to ready to detect and handle every event.
{

  if (Serial.available() > 0) {      // checking  if there is data reacived from the server or not.
    data = Serial.read();             // storing the data from the server in data variable 

    if (data == 'd' ) {                            // check if the recived data is "d" 
      for (int i = 0 ; i < 10 ; i++) {
        if ( digitalRead(pir) == 1) {               // if there is a motion 
          counter ++ ;                             // incease the number of the motions detected 
          delay(100);                              // wait 100 ms 

        }
      }
      if (counter > 5) {
        Serial.println('y');
        digitalWrite(2, 1);
      }
      if (counter <= 5) {
        Serial.println('n');
        digitalWrite(2, 0);
      }
    }
    if (data == '1')
      digitalWrite(2, 1);
    if (data == '0')
      digitalWrite(2, 0);

  }
}









//u will send me back motion or nomotion


char data = 0;                            // declaring a data variable  that will store the data from the server. 
int counter = 0;                      // declaring a counter  variable  that will store the number of motions detected.
int pir = 4;                          // declaring a pir  variable  that will store the number of the pin that the pir "The Motion sensor"  will be connected to.
int alarm = 2;                        // declaring an alarm  variable  that will store the number of the pin that the pir alarm  will be connected to.
void setup()                          // The main function that sets up the arduino configuration 
{
  Serial.begin(9600);                // Begin the serial communication and set the data rate in bits per second (baud)  to 9600 baud.
  pinMode(2, OUTPUT);                // set the mode of the pin number 2 on the ardiuno to be output pin.
  pinMode(8, OUTPUT);                // set the mode of the pin number 8 on the ardiuno to be output pin.
} 
void loop()                         // in finite loop that will repeat the code for ever to ready to detect and handle every event.
{

  if (Serial.available() > 0) {      // checking  if there is data reacived from the server or not.
    data = Serial.read();             // storing the data from the server in data variable 

    if (data == 'd' ) {                            // check if the recived data is "d" 
      for (int i = 0 ; i < 100 ; i++) {
        if ( digitalRead(pir) == 1) {               //  read the value from the pir sensor and check if it is high or low signal "is there any motion"
          counter ++ ;                             // incease the number of the motions detected 

        }
      }
     
    }
     if (counter > 50) {              // the case that we have motion
      Serial.flush() ;                  // delete the serial buffer 
        Serial.write('y');               // send "y" to the server 
        Serial.flush() ;             // delete the serial buffer 
        for(int i = 0;i<8;i++){         
          digitalWrite(8, 1); 
          delay(200);  
          digitalWrite(8, 0); 
          delay(200);    
        }         
      }
      if (counter <= 50) {        // the case that we have don't motion
        Serial.flush() ;           // delete the serial buffer 
        Serial.write('n');            // send "n" to the server 
        Serial.flush() ;           // delete the serial buffer 
        digitalWrite(8, 0);        // turn off the led that is connected to the pin number 8
      }
      counter=0;                    // change the counter state for the next motion check
    if (data == '1')                 // checking if the data reciced from the server is equals to "1"
      digitalWrite(2, 1);             // turn on the led that is connected to the pin number 2
    if (data == '0')                  // checking if the data reciced from the server is equals to "0"
      digitalWrite(2, 0);             // turn off the led that is connected to the pin number 2
  }

  }
