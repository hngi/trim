*Welcome, and thank you for contributing to this project. Please take your time to study this document carefully before making any changes to the codebase, to ensure you're on the same page with the rest of the team and we can all collaborate seamlessly.*   

# Workflow
This project uses the [Fork & Pull Model](https://help.github.com/en/articles/about-collaborative-development-models) 
for receiving contributions. Read about the Fork & Pull Model 
[here](https://help.github.com/en/articles/about-collaborative-development-models).     

## Branch Structure
### Upstream
The main / original / upstream (hereinafter upstream) repository will have only two (2) branches - master and develop. Additional hotfix branches may be created to work on critical bugs in the deployment.    
__'*develop*' - The Integration branch.__ This is where features from the different forks are brought together. Group leads, submit your pull requests here. This is the default branch. An integration team will be responsible for bringing it all together and resolving any possible merge conflicts that may arise.        
__'*master*' - The deployment branch.__ The code on this branch goes live to our hosting servers and must be kept in pristine condition. When the integration (develop) branch reaches a milestone, the deployment (master) branch is updated via pull request.       
__Hotfix branches.__ In the event that a bug slips past the integration team and makes it into deployment, a hotfix branch is created off of *master*. Prefix hotfix branch names with "hf__". On completion, this branch is merged with master, and also with *develop* so the fixes are reflected in all future deployments.

### Forks
Each fork represents work on a specific feature or task. Fork this repository to your own account and do all your work there. Do your work on the develop branch or create a new branch for yourself, then create a pull request to the `develop` branch of the main (upstream) repo. You may choose to rename your forked repo to include a description of what feature you are working on. Example: node-url-shortener__feature-name.       

### Staying Updated
When working with many people on the same codebase, sometimes others make changes that affect your work. While great care has been taken to create a modular team workflow to keep this to a minimum, merge conflicts are inevitable. It would _suck_ to finish working on a task or feature, only to find that the codebase has evolved and you need to rework everything to conform to the new changes. This is managed in two ways.       
__*First*__, make sure your work is in line with our specifications. Understand the folder structure and stick to it. Study the tasks list on Pivotal Tracker and identify any tasks that your work may depend on or that relates to yours in some way. Contact the team leads or project managers if you need any clarification. Do your due dilligence to make sure you are on the same page with everyone else. This is your responsibility. Your submission may be rejected if it's non-compliant.      
__*Second*__, each team member needs to make sure that at every given time, their working directory is up-to-date with the latest changes from the upstream *develop* branch. This is achieved with a two-fold process.       
#### Pulling Upstream
After setting up your fork on github and cloning it locally on your system, you'll need to run a command just once to create a connection between your local repository and the remote upstream repository. Note that there's automatically a remote 'origin' repository set up when you clone. This points to your fork. Now you need to set up 'upstream' which will point to the central upstream repo.

0. Open a terminal and go into the directory for the newly cloned repo. Now add the upstream remote like so:        
    <pre>git remote add upstream git://github.com/TEAM-NAME/REPO-NAME.git</pre>
PS: *You may get an error saying the `upstream` remote has already been configured. If so, then you are good to go.*   

Now you're all set up.       
__*The following steps must be run periodically to keep your work up-to-date! You can run these commands as often as every hour. You want to fetch any new changes as soon as possible. Each time you want to begin working, or take a break from your work, run these first.*__     
Be sure to [stash](https://dev.to/neshaz/how-to-git-stash-your-work-the-correct-way-cna) 
or commit all local changes first. 

1. Switch to the develop branch        
    <pre>git checkout develop</pre>     
2. Get all remote upstream changes into your local computer.        
    <pre>git fetch upstream</pre>     
3. Merge changes fetched with your local develop branch. ('develop' must be the currently checked-out branch)       
    <pre>git merge upstream/develop</pre>    
4. Push the newly merged changes to your fork's remote (online) repo. This is configured as 'origin' by default.    
    <pre>git push origin develop</pre>      

If you've created a new branch to work on rather than working directly on `develop`, then run the next steps.

5. Switch to your feature branch.        
    <pre>git checkout your-feature-branch</pre>        
6. Merge the changes on the newly merged develop branch, into your feature branch.        
    <pre>git merge develop</pre>
    *You may encounter merge conflicts here.
    [Resolve them](https://help.github.com/en/articles/resolving-a-merge-conflict-using-the-command-line),
    then come back and complete the merge. If you merge often enough, any conflicts would be trivial and very few.*

8. Finally, push your newly merged feature branch to the remote github server for backup.
    <pre>git push origin your-feature-branch</pre>   

## Code Structrure & Readability


