/**
 * Card game, 7 & 1/2.
 *
 * @author roma.sarda.casellas373@gmail.com
 * @version 1.0.
 * @date 09.11.23.
 */

package edu.fje.daw2.joccartes;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.ArrayList;

// This three classes are for adding the generated card to the player.
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/")
public class JocCarta {
    /**
     * Create a new game using codiPartida as an URL parameter.
     * http://localhost:8888/jocCartes_war_exploded/api/iniciarJoc/1.
     * 
     * 
     * @param codiPartida
     * @return True if codiPartida has been iniciated, or false if it hasn't.
     */

    // Here I declare some global variables.
    private static ArrayList<Integer> partidaIniciada = new ArrayList<>();

    // I create a new Map called totalCartes, where the key is the name of the
    // player, and the value is the content of the array.
    private static Map<Integer, List<String>> totalCartes = new HashMap<>();

    // Create a map to store bet points.
    private static Map<Integer, List<Integer>> quantitatRestant = new HashMap<>();

    Integer codiPartida = 0, numJug = 0;
    Boolean partidaIniciadaPrev = false;

    @POST
    @Path("/iniciarJoc")
    @Produces(MediaType.TEXT_PLAIN)
    public String iniciarJoc(@FormParam("codiPartida") Integer codiPartida) {
        /*
         * partidaIniciada.contains(codiPartida) is to search there's codiPartida in the
         * array.
         */
        if (!partidaIniciada.contains(codiPartida)) {
            partidaIniciada.add(codiPartida); // This is to add codiPartida to the arraylist.

            // return "La partida amb codi " + codiPartida + " ha estat inicialitzada
            // correctament.";
            return Response.status(200, "La partida amb codi " + codiPartida + " ha estat inicialitzada correctament.")
                    .build()
                    .toString();
        }

        return Response.status(404, "La partida amb codi " + codiPartida + " prèviament ja ha estat inicialitzada.")
                .build().toString();
    }

    /**
     * Method that will get a random card for the player.
     * http://localhost:8888/jocCartes_war_exploded/api/obtenirCarta/1/1.
     * 
     * @param codiPartida
     * @param numJug
     * @return Random card for the player.
     */

    @GET
    @Path("/obtenirCarta/{codiPartida}/{numJug}")
    @Produces(MediaType.APPLICATION_JSON) // I return a JSON.
    public String obtenirCarta(@PathParam("codiPartida") Integer codiPartida, @PathParam("numJug") Integer numJug) {
        if (partidaIniciada.contains(codiPartida)) {
            // Here I create a new instance of ObtenirCarta as genCarta.
            ObtenirCarta genCarta = new ObtenirCarta();

            // Array that has the possible types of cards.
            String[] tipusCarta = { "ors", "espases", "copes", "bastons" };
            String cartaObtinguda = genCarta.generarCarta(tipusCarta);

            /**
             * This line is from ChatGPT, because I had no idea how to do it.
             * totalCartes is the Map I created previously.
             * computeIfAbsent() checks if numJug (key) is associated to an array, if isn't,
             * creates a new ArrayList.
             */
            totalCartes.computeIfAbsent(numJug, k -> new ArrayList<String>());

            // This is to add 100 points to a player when I create it, and it's the first
            // time the player gets a card.
            quantitatRestant.computeIfAbsent(codiPartida, k -> new ArrayList<>());

            if (totalCartes.get(codiPartida).size() == 0 && !partidaIniciadaPrev) {
                quantitatRestant.get(numJug).add(100);
                System.out.println("El jugador " + numJug + " té " +
                        quantitatRestant.get(numJug) + " fitxes.");
            }

            // Add the card to the player's list.
            totalCartes.get(numJug).add(cartaObtinguda);
            partidaIniciadaPrev = true;

            return Response.status(200, "El jugador " + numJug + " ha obtingut " + cartaObtinguda).build()
                    .toString();
        }

        return Response.status(404, "La partida amb codi " + codiPartida + " encara no ha estat inicialitzada.")
                .build().toString();
    }

    /**
     * Method that will show the cards that the player has.
     * http://localhost:8888/jocCartes_war_exploded/api/mostrarCartes/1/1.
     *
     * @param codiPartida
     * @param numJug
     * @return The cards the the player has.
     */
    @GET
    @Path("/mostrarCartes/{codiPartida}/{numJug}")
    @Produces(MediaType.APPLICATION_JSON) // I return a JSON.
    public String mostrarCartes(@PathParam("codiPartida") Integer codiPartida, @PathParam("numJug") Integer numJug) {
        if (partidaIniciada.contains(codiPartida)) {
            if (totalCartes.get(numJug) == null) {
                return Response.status(404, "El jugador " + numJug + " no està jugant en aquesta partida.")
                        .build().toString();
            } else if (totalCartes.get(numJug).size() == 0) {
                return Response.status(404, "El jugador " + numJug + " no té cartes.")
                        .build().toString();
            } else {
                // I covert ArrayList to string using .toString().
                String cartesRestants = totalCartes.get(numJug).toString();

                return Response.status(200, "Partida " + codiPartida + ", jugador " + numJug + ": " + cartesRestants)
                        .build()
                        .toString();
            }
        }

        return Response.status(404, "La partida amb codi " + codiPartida + " encara no ha estat inicialitzada.")
                .build().toString();
    }

    /**
     * Method that will throw a card from the player.
     * http://localhost:8888/jocCartes_war_exploded/api/tirarCarta/1/1/1.
     *
     * @param codiPartida
     * @param numJug
     * @param carta
     * @return Thow a card from the player.
     */
    @PUT
    @Path("/tirarCarta")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.TEXT_PLAIN)
    public String tirarCarta(@FormParam("codiPartida") Integer codiPartida, @FormParam("numJug") Integer numJug,
            @FormParam("carta") Integer carta) {
        System.out.println("Partida iniciada: " + partidaIniciada.contains(codiPartida));

        if (partidaIniciada.contains(codiPartida)) {
            // This three first conditionals are to check if the parameters are set.
            if (codiPartida == null) {
                return Response
                        .status(404, "El jugador no pot tirar la carta a causa de no haver indicat el codi de partida.")
                        .build().toString();
            } else if (numJug == null) {
                return Response.status(404, "El jugador no pot jugar a la partida " + codiPartida
                        + " a causa de no haver indicat el seu codi de jugador.")
                        .build().toString();
            } else if (carta == null) {
                return Response.status(404, "El jugador " + numJug
                        + " no pot tirar la carta a causa de no haver indicat la carta que vol tirar.")
                        .build().toString();
            } else if (totalCartes.get(numJug) == null) {
                return Response.status(404, "El jugador " + numJug + " no està jugant en aquesta partida.")
                        .build().toString();
            } else {
                boolean cartaTrobada = false;

                for (int i = 0; i < totalCartes.get(numJug).size(); i++) {
                    // "i + 1" is because I'd like to be able to delete the first card of the
                    // array if the user enters 1.
                    if (i + 1 == carta) {
                        cartaTrobada = true;
                        break;
                    }
                }

                if (!cartaTrobada) {
                    return Response.status(404, "El jugador " + numJug + " no disposa d'aquesta carta")
                            .build().toString();
                } else if (totalCartes.get(numJug).size() == 0) {
                    // If the player doesn't have any card.
                    return Response.status(404, "El jugador " + numJug + " no té cartes restants.")
                            .build().toString();
                } else {
                    // Delete the card from the player using remove method, I rest 1 to carta
                    // because I added it before.
                    // System.out.println(totalCartes.get(numJug).remove(carta - 1));
                    String cartaTirada = totalCartes.get(numJug).remove(carta - 1);

                    return Response
                            .status(200, "El jugador " + numJug + " de la partida " + codiPartida + " tira la carta "
                                    + cartaTirada + ".")
                            .build()
                            .toString();
                }
            }
        } else {
            if (codiPartida == null) {
                return Response.status(404, "La partida encara no ha estat inicialitzada.").build()
                        .toString();
            } else {
                return Response.status(404, "La partida amb codi " + codiPartida + " encara no ha estat inicialitzada.")
                        .build()
                        .toString();
            }
        }
    }

    /**
     * Method to bet points on a game.
     * http://localhost:8888/jocCartes_war_exploded/api/moureJugador/1/1/aposta/30.
     *
     * @param codiPartida
     * @param numJug
     * @param quantitat
     * @return Bet amount from the player.
     */
    @PUT
    @Path("/moureJugador/aposta")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.TEXT_PLAIN)
    public String apostar(@FormParam("codiPartida") Integer codiPartida, @FormParam("numJug") Integer numJug,
            @FormParam("quantitatApostada") Integer quantitatApostada) {
        if (partidaIniciada.contains(codiPartida)) {
            // Create a new arraylist to store the values.
            List<Integer> quantitatPuntsJug = quantitatRestant.get(numJug);

            if (codiPartida == null) {
                return Response
                        .status(404, "El jugador no pot tirar la carta a causa de no haver indicat el codi de partida.")
                        .build().toString();
            } else if (numJug == null) {
                return Response.status(404, "El jugador no pot jugar a la partida " + codiPartida
                        + " a causa de no haver indicat el seu codi de jugador.")
                        .build().toString();
            } else if (quantitatApostada == null) {
                return Response
                        .status(404,
                                "El jugador " + numJug + " no pot apostar a causa de no haver indicat la quantitat.")
                        .build().toString();
            } else if (totalCartes.get(numJug) == null) {
                return Response.status(404, "El jugador " + numJug + " no està jugant en aquesta partida.")
                        .build().toString();
            } else if (totalCartes.get(numJug).size() == 0) {
                return Response
                        .status(404,
                                "El jugador " + numJug + " no pot apostar fitxes a causa de no tenir cartes restants.")
                        .build().toString();
            } else {
                System.out.println("DEBUG - Quantitat punts jugador: " + numJug + quantitatPuntsJug);
                System.out.println("DEBUG - Quantitat punts apostats: " + quantitatApostada);

                if (quantitatPuntsJug.size() >= quantitatApostada) {
                    System.out.println("DEBUG - Entro");

                    for (int i = 0; i < quantitatPuntsJug.size(); i++) {
                        quantitatPuntsJug.set(i, quantitatPuntsJug.get(i) - quantitatApostada);
                    }

                    System.out.println("Quantitat restant: " + quantitatPuntsJug);

                } else if (quantitatApostada >= quantitatPuntsJug.size()) {
                    return Response.status(404, "El jugador " + numJug + " no pot apostar " + quantitatApostada
                            + " fitxes, ja que superen la quantitat de fitxes disponibles.")
                            .build().toString();
                }
                // If the player doesn't have any point.
                else if (quantitatRestant.get(numJug).contains(0)) {
                    return Response.status(404, "El jugador " + numJug + " no té cap fitxa restant.")
                            .build().toString();
                }

                return Response
                        .status(200, "El jugador " + numJug + " aposta " + quantitatApostada + " fitxes. Li queden "
                                + quantitatRestant.get(numJug)
                                + " fitxes.")
                        .build().toString();

            }
        } else {
            return Response.status(404, "La partida amb codi " + codiPartida + " encara no ha estat inicialitzada.")
                    .build().toString();
        }
    }

    /**
     * Method for the user to say that don't want to play on the turn.
     * http://localhost:8888/jocCartes_war_exploded/api/moureJugador/1/1/passa.
     *
     * @param codiPartida
     * @param numJug *
     * @return True if a player doesn't want to play, false if wants to play.
     */
    @PUT
    @Path("/moureJugador/passa")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.TEXT_PLAIN)
    public String passar(@FormParam("codiPartida") Integer codiPartida, @FormParam("numJug") Integer numJug) {
        if (partidaIniciada.contains(codiPartida)) {
            if (codiPartida == null) {
                return Response
                        .status(404, "El jugador no pot tirar la carta a causa de no haver indicat el codi de partida.")
                        .build()
                        .toString();
            } else if (numJug == null) {
                return Response.status(404, "El jugador no pot jugar a la partida " + codiPartida
                        + " a causa de no haver indicat el seu codi de jugador.").build()
                        .toString();
            } else {
                return Response.status(200, "El jugador " + numJug + " decideix passar en aquest torn.").build()
                        .toString();
            }
        } else {
            return Response.status(404, "La partida amb codi " + codiPartida + " encara no ha estat inicialitzada.")
                    .build()
                    .toString();
        }
    }

    /**
     * Method to emd a game.
     * http://localhost:8888/jocCartes_war_exploded/api/acabarJoc
     *
     * @param codiPartida
     * @return End the game.
     */
    @DELETE
    @Path("/acabarJoc")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String esborrarPartida(@FormParam("codiPartida") Integer codiPartida) {
        if (partidaIniciada.contains(codiPartida)) {
            // System.out.println("ENTRO - BORRAR PARTIDA SENSE TENIR CARTES.");
            partidaIniciada.remove(codiPartida);

            if (totalCartes.get(codiPartida).size() == 0) {
                // System.out.println("FINAL - BORRAR PARTIDA SENSE TENIR CARTES.");
                return Response
                        .status(404, "Algun dels jugadors no tenia cap carta, però la partida amb codi " + codiPartida
                                + " ha estat acabada correctament.")
                        .build()
                        .toString();
            } else {
                // totalCartes.get(codiPartida).clear(); is to reset the array, so the players
                // doesn't have any
                // card if they start the same game again.
                totalCartes.get(codiPartida).clear();

                return Response.status(200, "La partida amb codi " + codiPartida + " ha estat acabada correctament.")
                        .build()
                        .toString();
            }
        } else {
            return Response.status(404, "La partida amb codi " + codiPartida + " encara no ha estat inicialitzada.")
                    .build()
                    .toString();
        }
    }
}