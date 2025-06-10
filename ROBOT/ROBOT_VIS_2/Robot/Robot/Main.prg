'---------------------------------------------'
' Programa de Robot EPSON, Estación EVA-MBI   '
' Ms.C Aaron Castillo						  '
'---------------------------------------------'
Function main
	OpenNet #202 As Client
	Print "Waiting for conection..."
	WaitNet #202
	Print "Conection successful"
	Print #202, "program_initiated"	'Este mensaje es necesario para el manager
    
	'TLSet 1, XY(-24, 20, 0, 0)
	'Tool 1
	CollisionDetect Off
	Motor On
	Init_State()
	Work_Speed()
  	Go_Home()
  	Print("fue a homeinicio")
	Do While (1)
		If (ChkNet(202) > 0) Then
            Read_Message()
            Get_DesiredPoint() 'y se guarda el punto deseado en P200, DesiredBox$ vale la caja deseada o Undefined
		  	
		  	If DesiredPoint$ = "HOME" Then
		  	
		  		Go_Home()
		  		'Send_Message(Reached$)
		  		
		  	ElseIf DesiredPoint$ = "Undefined" Then
		  		Print("Punto No Válido")
		  	Else
		  		'Si la orientación de la U es mayor a 10, es decir que cambia mucho y debes girar...
		  		If Abs(CU(RealPos) - CU(P200)) > 10 Then
		  		
		  			If CZ(RealPos) < Zlow Then
						Move Here :Z(Zlow)  'Ir a la altura segura
					EndIf
					
		  			Move Here :Y(Yzone)    'Ir a la zona segura para giros
		  			'Move Here :U(CU(P200)) ROT 'Girar a la U de la posición deseada
		  			
		  			If CX(P200) < -460 Then
		  				Print("ENTROOOOOOy")
		  				
		  				If CX(RealPos) < -460 Then
		  					Print("ENTROOOOOO2y")
		  					Move Here :X(-350)
		  					
		  					Move Here :U(CU(P200)) ROT
		  				EndIf
		  				
		  				If CX(RealPos) > -100 Then
		  					Print("ENTROOOOOO3y")
		  					Move Here :U(CU(P200)) ROT
		  					Move Here :X(-100)
		  				EndIf
		  				
		  				Move Here :U(CU(P200)) ROT
		  				Go P200 :Z(CZ(RealPos))
		  				Move P200
		  				
		  			ElseIf CX(P200) > 460 Then
		  				
		  				
		  				If CX(RealPos) < 100 Then
		  					Move Here :U(CU(P200)) ROT
		  					Move Here :X(100)
		  				EndIf
		  				
		  				Move Here :U(CU(P200)) ROT
		  				Go P200 :Z(CZ(RealPos))
		  				Move P200
		  				
		  			Else
		  				Move Here :U(CU(P200)) ROT
		  				Move Here :X(CX(P200))
		  				Move Here :Y(CY(P200))
		  				Move P200
		  			EndIf
		  			
	
		  			Print (Reached$)
					Send_Message(Reached$)
					
				Else
					
					If CZ(P200) < Zlow Then
						Move Here :Z(Zlow)  'Ir a la altura segura
						Move Here :U(CU(P200)) ROT
					Else
						Move Here :U(CU(P200)) ROT
					EndIf
					
					
					
					If CX(RealPos) < -460 Then
						Go Here :X(-425)
					EndIf
					
					If CX(RealPos) > 460 Then
						Go Here :X(425)
					EndIf
					
								
					If CY(RealPos) < 250 Then
						Move Here :Y(Yzone)  'Ir a la altura segura
					EndIf
					
					
					If Abs(CX(RealPos) - CX(P200)) > 180 Then
					
						If CZ(RealPos) < Zzone Then
							Move Here :Z(Zzone)  'Ir a la altura segura
						EndIf
						
					EndIf
					
					
					If CX(P200) < -460 Then
		  				Print("ENTROOOOOOsn")
		  				If CX(RealPos) > -100 Then
		  					Move Here :X(-100)
		  				EndIf
		  				Go P200 :Z(CZ(RealPos))
		  				Move P200
		  				
		  			ElseIf CX(P200) > 460 Then
		  				Print("ENTROOOOOO2sn")
		  				
		  				If CX(RealPos) < 100 Then
		  					Move Here :X(100)
		  				EndIf
		  				
		  				Go P200 :Z(CZ(RealPos))
		  				Move P200
		  				
		  			Else
		  				Move Here :X(CX(P200))
		  				Move Here :Y(CY(P200))
		  				Move P200
		  			EndIf

		  			Print (Reached$)
					Send_Message(Reached$)
					
		  		EndIf
		  		
		  	EndIf
		  		
		EndIf
	Loop
Fend

Function mantenimiento_Z
	Motor On
	Speed 50
	Accel 50, 50
	
	Do
		Go P900
		Go P901
	Loop
	
	
	
Fend

