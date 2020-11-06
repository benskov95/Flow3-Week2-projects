package utils;

import entities.Role;
import entities.User;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class SetupTestUsers {
    
       
    public static void main(String[] args) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("pu");
        EntityManager em = emf.createEntityManager();
        User user1 = new User("user", "test1");
        User user2 = new User("admin", "test2");
        User user3 = new User("user_admin", "test3");
        User user4 = new User("no_rights", "test4");
        Role role1 = new Role("user");
        Role role2 = new Role("admin");
        Role role3 = new Role("no_rights");
        
        user1.addRole(role1);
        user2.addRole(role2);
        user3.addRole(role1);
        user3.addRole(role2);
        user4.addRole(role3);
        
        em.getTransaction().begin();
        em.persist(user1);
        em.persist(user2);
        em.persist(user3);
        em.persist(user4);
        em.getTransaction().commit();
        
    }
}