# To run the just code
1. Open VS Code
2. Enter `Alt + B` or Click `Run` at the top menu then click `Run Without Debugging`

# To run on apache
## YouTube link for instruction: https://youtu.be/IB4COCF2lVE
1. copy and paste the folder to `htdocs` under `xampp`
2. open `httpd-vhosts.conf` file under `xampp/apache/conf/extra` and copy and paste <VirtualHost> tag below 
<VirtualHost qa.final.com:80>    
    DocumentRoot "C:/xampp/htdocs/qa.final.com"
    ServerName qa.assignment3.com    
    <Directory "C:/xampp/htdocs/qa.final.com">
        Require all granted
    </Directory>
</VirtualHost>

3. open `hosts` file under `c:/Windows/System32/drivers/etc`and copy and paste the line below
127.0.0.1       qa.final.com