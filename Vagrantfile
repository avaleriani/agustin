# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
    config.vm.box = "scotch/box"
    config.vm.network "private_network", ip: "192.168.33.10"
    config.vm.hostname = "scotchbox2"
    config.vm.synced_folder ".", "/var/www", :mount_options => ["dmode=777", "fmode=666"]
    
    # Optional NFS. Make sure to remove other synced_folder line too
    #config.vm.synced_folder ".", "/var/www", :nfs => { :mount_options => ["dmode=777","fmode=666"] }
	config.push.define "ftp" do |push|
		push.host = "185.27.134.11:21"
		push.username = "kaboo_16923981"
		push.password = "czjmdq0x"
        push.destination = "/htdocs/test"
        push.dir = "public"
		push.secure = "false"
	end
end

