# HGOP

## Team Members:
Daníel Ekaphan Valberg - danielv16@ru.is - KT: 211096-2339  
Einar Orri Þormar - einart16@ru.is - KT: 081292-2139

---

## Week 1

URL to instance running api:
- Daniel's - [http://ec2-34-227-161-151.compute-1.amazonaws.com:3000/status](http://ec2-34-227-161-151.compute-1.amazonaws.com:3000/status) (this one has been terminated)
- Einar's - [http://ec2-52-207-255-176.compute-1.amazonaws.com:3000/status](http://ec2-52-207-255-176.compute-1.amazonaws.com:3000/status)

We are both running Ubuntu 18.04 LTS, we have not gotten the chance to test everything on Mac OSX. Everything has worked flawlessly on our machines so far, but the only concerns are minor things like verify_environments.sh, some commands may be different on Macs!

---

## Week 2

Jenkins instance: [http://ec2-54-159-34-3.compute-1.amazonaws.com:8080/](http://ec2-54-159-34-3.compute-1.amazonaws.com:8080/) (One of us switched to a new computer and the KeyPair did not work properly so we had to work around it and get a new domain)

Our game-api instance IP is listed in the deployment log as requested. The API calls are as follows:

**GET** requests:
```
{IP}:3000/status           - To check if API is up and running
{IP}:3000/state            - To get the game's state
```

**POST** requests:
```
{IP}:3000/start            - Start a game if non is running
{IP}:3000/guess21OrUnder   - Guess 21 or under
{IP}:3000/guessOver21      - Guess over 21

--- following is not implemented but callable ---

{IP}:3000/stats            - Should post stats to database

```

---

**NOTES:** While working on the project we did not focus too much on branching, as we believe that at this set-up stage, before having the Deploy job on Jenkins that it was not too necessary. Going onwards we plan to branch to a development branch.

We implemented all the TODOS: as well as we could. Hopefully we did not miss out any like last time!

There may be some extra files that have been created and are in use. ```.dockerignore``` is used to ignore files that we do not want to copy over to our container/image. ```package-lock.json``` just to keep packages locked, as ESLint google extension requested.

---