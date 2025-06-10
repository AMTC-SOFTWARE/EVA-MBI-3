Function Send_Message(Msg$ As String)
	Print #202, Msg$
Fend

Function Read_Message
	Integer pos
	
	Read #202, DesiredPoint$, ChkNet(202)
	Print #202, "message_recieved: " + DesiredPoint$
	Print (DesiredPoint$)
	'Print DesiredPoint$
		
	If DesiredPoint$ = "test try" Or DesiredPoint$ = "test" Or DesiredPoint$ = "Message Received" Then
		DesiredPoint$ = "Undefined"
	Else
		Dividir_Lectura()
		
	EndIf
		
	
Fend

Function Dividir_Lectura
	
	String TempRight$, TempLeft$
	Integer pos
	
	If DesiredPoint$ <> "HOME" Then

		pos = InStr(DesiredPoint$, "_")
		TempLeft$ = Left$(DesiredPoint$, pos - 1)
		TempRight$ = Right$(DesiredPoint$, Len(DesiredPoint$) - pos)
		
		If TempLeft$ = "TBLU" Then
			DesiredBox$ = "TBLU"
		ElseIf TempLeft$ = "F96" Then
			DesiredBox$ = "F96"
		ElseIf TempLeft$ = "MFB" Then
			pos = InStr(TempRight$, "_")
			TempLeft$ = Left$(TempRight$, pos - 1)
			If (TempLeft$ = "P2") Then
				DesiredBox$ = "MFBP2"
			ElseIf (TempLeft$ = "P1") Then
				DesiredBox$ = "MFBP1"
			ElseIf (TempLeft$ = "S") Then
				DesiredBox$ = "MFBS"
			ElseIf (TempLeft$ = "E") Then
				DesiredBox$ = "MFBE"
			Else
				DesiredBox$ = "Undefined" 'Mensaje no válido o inválido
			EndIf
		ElseIf TempLeft$ = "PDC" Then
			pos = InStr(TempRight$, "_")
			TempLeft$ = Left$(TempRight$, pos - 1)
			If (TempLeft$ = "R") Or (TempLeft$ = "RMID") Or (TempLeft$ = "S") Then
				DesiredBox$ = "PDCR"
			ElseIf (TempLeft$ = "D") Then
				DesiredBox$ = "PDCD"
			ElseIf (TempLeft$ = "Dbracket") Then
				DesiredBox$ = "PDCDbracket"
			ElseIf (TempLeft$ = "P") Then
				DesiredBox$ = "PDCP"
			ElseIf (TempLeft$ = "S") Then
				DesiredBox$ = "PDCS"
			ElseIf (TempLeft$ = "F96") Then
				DesiredBox$ = "F96"
			Else
				DesiredBox$ = "Undefined" 'Mensaje no válido o inválido
			EndIf
		Else
			DesiredBox$ = "Undefined" 'Mensaje no válido o inválido		
		EndIf
		
	EndIf
Fend
