package edu.fje.daw2.controladors;

import edu.fje.daw2.model.Client;
import edu.fje.daw2.repositoris.ClientRepositori;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Controlador de clients
 * Verifica el funcionament de curl
 * 
 * @version 1.0 21.3.19
 * @version 2.0 25.3.24
 */
@Controller
@SessionAttributes("clients")
public class ClientsController {

    @Autowired
    private ClientRepositori repositori;

    @ModelAttribute("clients")
    public List<Client> inicialitzar() {
        List<Client> clients = new ArrayList<>();
        for (Client c : repositori.findAll()) {
            clients.add(c);
        }
        return clients;
    }

    @RequestMapping(value = { "/client", "/usuari" })
    String mostrarFormulari() {
        return "formulari";
    }

    @RequestMapping(value = { "/deleteClient" })
    String mostrarFormulariEsborrat() {
        return "formulariEsborrar";
    }

    @RequestMapping(value = { "/canviarClient" })
    String mostrarFormulariModificar() {
        return "formulariModificar";
    }

    @RequestMapping(value = "/desarClient", method = RequestMethod.POST)
    String desarClient(@SessionAttribute("clients") List<Client> clients,
            @RequestParam(defaultValue = "") String nom,
            @RequestParam(defaultValue = "") String cognom,
            @RequestParam(defaultValue = "") int volumCompres,
            ModelMap model) {
        Client c = new Client(nom, cognom, volumCompres);
        repositori.save(c);

        if (!model.containsAttribute("clients")) {
            model.addAttribute("clients", clients);
        }

        clients.add(c);
        return "llistarClients";
    }

    @RequestMapping(value = "/modificarClient", method = RequestMethod.POST)
    String modificarClient(@SessionAttribute("clients") List<Client> clients,
            @RequestParam(defaultValue = "") String id,
            @RequestParam(defaultValue = "") String nom,
            @RequestParam(defaultValue = "") String cognom,
            @RequestParam(defaultValue = "") int volumCompres,
            ModelMap model) {
        Client c = repositori.findById(id).orElse(null);

        if (c != null) {
            c.setNom(nom);
            c.setCognom(cognom);
            c.setVolumCompres(volumCompres);
            repositori.save(c);
        }

        // Firstly, I clear all clients, then, I add
        clients.clear();

        for (Client client : repositori.findAll()) {
            clients.add(client);
        }

        return "llistarClients";
    }

    @RequestMapping(value = "/esborrarClient", method = RequestMethod.POST)
    String esborrarClient(@SessionAttribute("clients") List<Client> clients,
            @RequestParam(defaultValue = "") String id) {
        repositori.deleteById(id);

        clients.removeIf(client -> client.getId().equals(id));

        return "llistarClients";
    }

    @RequestMapping(value = "/mostrarClients", method = RequestMethod.GET)
    String mostrarClients(@SessionAttribute("clients") List<Client> clients, ModelMap model) {
        clients.clear();
        for (Client c : repositori.findAll()) {
            clients.add(c);
        }
        if (!model.containsAttribute("clients")) {
            model.addAttribute("clients", clients);
        }
        return "llistarClients";
    }
}
