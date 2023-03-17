

const LocationItem = ({ location }) => {

    return (
        <View>
            <View>
                <Text>{location.materiel.nom}</Text>
                <Text>{location.client["prenom"]} {location.client["nom"]}</Text>
            </View>
            <View>
                <Text>{location.materiel.jourDebut}</Text>
                <Text>{location.materiel.jourFin}</Text>
            </View>
        </View>
    )
}