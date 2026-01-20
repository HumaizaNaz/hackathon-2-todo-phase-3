
C:\Users\km\Desktop\docs\hackatho-2\phase-3>git push -u origin main
Enumerating objects: 346, done.
Counting objects: 100% (346/346), done.
Delta compression using up to 4 threads
Compressing objects: 100% (308/308), done.
Writing objects: 100% (346/346), 3.88 MiB | 905.00 KiB/s, done.
Total 346 (delta 23), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (23/23), done.
remote: error: GH013: Repository rule violations found for refs/heads/main.
remote: 
remote: - GITHUB PUSH PROTECTION
remote:   —————————————————————————————————————————
remote:     Resolve the following violations before pushing again
remote:
remote:     - Push cannot contain secrets
remote:
remote:
remote:      (?) Learn how to resolve a blocked push
remote:      https://docs.github.com/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/working-with-push-protection-from-the-command-line#resolving-a-blocked-push
remote:
remote:
remote:       —— OpenAI API Key ————————————————————————————————————
remote:        locations:
remote:          - commit: bffb905e23e93cf782a60d4ed6e88a9e0ac0daec
remote:            path: run.md:1
remote:
remote:        (?) To push, remove secret from commit(s) or follow this URL to allow the secret.       
remote:        https://github.com/HumaizaNaz/hackathon-2-todo-phase-3/security/secret-scanning/unblock-secret/38Whg5kAXJV9KeEGD8Bz8HXq2g9
remote:
remote:
remote:
To https://github.com/HumaizaNaz/hackathon-2-todo-phase-3.git
 ! [remote rejected] main -> main (push declined due to repository rule violations)
error: failed to push some refs to 'https://github.com/HumaizaNaz/hackathon-2-todo-phase-3.git'