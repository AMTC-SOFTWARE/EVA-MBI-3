Function Go_Home
	
	Print("Home X: " + Str$(CX(Home1)) + "	Current X: " + Str$(CX(RealPos)))
	Print("Home Y: " + Str$(CY(Home1)) + "	Current Y: " + Str$(CY(RealPos)))
	Print("Home Z: " + Str$(CZ(Home1)) + "	Current Z: " + Str$(CZ(RealPos)))
	Print("Home U: " + Str$(CU(Home1)) + "	Current U: " + Str$(CU(RealPos)))
	
	'If (CX(RealPos) - 1 <= CX(Home1) <= CX(RealPos) + 1) And (CY(RealPos) - 1 <= CY(Home1) <= CY(RealPos) + 1) And (CZ(RealPos) - 1 <= CZ(Home1) <= CZ(RealPos) + 1) And (CU(RealPos) - 1 <= CU(Home1) <= CU(RealPos) + 1) Then
		'Print("I'm at home :D")
	'If (CX(RealPos) = CX(Home1)) And (CY(RealPos) = CY(Home1)) And (CZ(RealPos) = CZ(Home1)) And (CU(RealPos) = CU(Home1)) Then
		'Print("I'm at home :D")
	If ((CX(RealPos) >= CX(Home1) - 1) And (CX(RealPos) <= CX(Home1))) Or ((CX(RealPos) <= CX(Home1) + 1) And (CX(RealPos) >= CX(Home1))) Then
		If ((CY(RealPos) >= CY(Home1) - 1) And (CY(RealPos) <= CY(Home1))) Or ((CY(RealPos) <= CY(Home1) + 1) And (CY(RealPos) >= CY(Home1))) Then
			Print("I'm at home x :D")
			Send_Message(HomeMsj$)
		EndIf
		
	Else
		Print("I'm far away from home... :(")
		Print("But I'm coming home :)")
		
		
		
		If CZ(RealPos) < Zlow Then
			Move Here :Z(Zlow)  'Ir a la altura segura
		EndIf
		
		
		If CX(RealPos) < -460 Then
			Go Here :X(-425)
		EndIf
		
		If CX(RealPos) > 460 Then
			Go Here :X(425)
		EndIf
		
		
		Move Here :Y(Yzone)
		
		Move Here :U(CU(Home1)) ROT
		Move Here :Z(Zzone)
		
		Move Here :X(CX(Home1))
		Go Home1
	
		Print("Hi, I'm at home :D")
		Send_Message(HomeMsj$)
	EndIf
	
Fend


